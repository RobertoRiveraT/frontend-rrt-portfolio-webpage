import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { workItems } from '../../articles/work-items';
import { WorkCategory, WorkItem } from '../../articles/work-item.interface';

@Component({
  selector: 'app-mywork',
  templateUrl: './mywork.component.html',
  styleUrls: ['./mywork.component.css']
})
export class MyworkComponent implements OnInit, OnDestroy {
  /** Current selected filter category */
  selectedCategory: WorkCategory | 'All' = 'All';
  
  /** Current selected year filter */
  selectedYear: string = 'All';
  
  /** All work items sorted by date */
  allItems: WorkItem[] = [];
  
  /** Available years extracted from work items */
  availableYears: string[] = [];
  
  /** Show/hide scroll to top button */
  showScrollTop = false;

  /** Year dropdown state */
  isYearDropdownOpen = false;

  /** Available filter categories */
  readonly categories: ReadonlyArray<WorkCategory | 'All'> = [
    'All', 
    'Projects', 
    'QA',
    'Fullstack',
    'GameDev',
    'Certifications'
  ];

  /** Check if grid view should be used (only when category is 'All') */
  get useGridView(): boolean {
    return this.selectedCategory === 'All';
  }

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // Sort items by start date (newest first)
    this.allItems = [...workItems].sort((a, b) => 
      b.startDate.localeCompare(a.startDate)
    );

    // Extract unique years from work items
    this.extractAvailableYears();

    // Subscribe to query params for filters
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        // Handle category param
        const category = params['category'];
        if (category && this.categories.includes(category)) {
          this.selectedCategory = category as WorkCategory | 'All';
        } else {
          this.selectedCategory = 'All';
        }

        // Handle year param
        const year = params['year'];
        if (year && (year === 'All' || this.availableYears.includes(year))) {
          this.selectedYear = year;
        } else {
          this.selectedYear = 'All';
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Extract unique years from all work items */
  private extractAvailableYears(): void {
    const yearsSet = new Set<string>();
    
    this.allItems.forEach(item => {
      // Extract year from startDate (format: YYYY-MM or YYYY)
      const year = item.startDate.substring(0, 4);
      yearsSet.add(year);
    });

    // Convert to array and sort descending (newest first)
    this.availableYears = Array.from(yearsSet).sort((a, b) => b.localeCompare(a));
  }

  /** Get filtered items based on selected category AND year */
  get filteredItems(): WorkItem[] {
    let items = this.allItems;

    // Filter by category
    if (this.selectedCategory !== 'All') {
      const selected: WorkCategory = this.selectedCategory;
      items = items.filter(item => item.category.includes(selected));
    }

    // Filter by year
    if (this.selectedYear !== 'All') {
      items = items.filter(item => item.startDate.startsWith(this.selectedYear));
    }

    return items;
  }

  /** Get count of items for a specific year (filtered by current category) */
  getYearCount(year: string): number {
    // First filter by category if one is selected
    let items = this.allItems;
    if (this.selectedCategory !== 'All') {
      const selected: WorkCategory = this.selectedCategory;
      items = items.filter(item => item.category.includes(selected));
    }

    // Then count by year
    if (year === 'All') {
      return items.length;
    }
    return items.filter(item => item.startDate.startsWith(year)).length;
  }

  /** Get count of items for a specific category */
  getCategoryCount(category: WorkCategory | 'All'): number {
    if (category === 'All') {
      return this.allItems.length;
    }
    return this.allItems.filter(item => item.category.includes(category)).length;
  }

  /** Get available years filtered by current category */
  get filteredAvailableYears(): string[] {
    let items = this.allItems;
    
    // Filter by category if one is selected
    if (this.selectedCategory !== 'All') {
      const selected: WorkCategory = this.selectedCategory;
      items = items.filter(item => item.category.includes(selected));
    }

    // Extract unique years from filtered items
    const yearsSet = new Set<string>();
    items.forEach(item => {
      const year = item.startDate.substring(0, 4);
      yearsSet.add(year);
    });

    return Array.from(yearsSet).sort((a, b) => b.localeCompare(a));
  }

  /** Filter by category and update URL */
  filterCategory(category: WorkCategory | 'All'): void {
    this.selectedCategory = category;
    
    // Reset year filter if the selected year is no longer available in this category
    if (this.selectedYear !== 'All' && !this.filteredAvailableYears.includes(this.selectedYear)) {
      this.selectedYear = 'All';
    }
    
    this.updateUrlParams();
  }

  /** Filter by year and update URL */
  filterYear(year: string): void {
    this.selectedYear = year;
    this.updateUrlParams();
  }

  /** Toggle year dropdown */
  toggleYearDropdown(): void {
    this.isYearDropdownOpen = !this.isYearDropdownOpen;
  }

  /** Select year from dropdown */
  selectYear(year: string): void {
    this.filterYear(year);
    this.isYearDropdownOpen = false;
  }

  /** Close dropdown when clicking outside */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.year-dropdown-container')) {
      this.isYearDropdownOpen = false;
    }
  }

  /** Update URL query params with current filters */
  private updateUrlParams(): void {
    const queryParams: { category?: string; year?: string } = {};
    
    if (this.selectedCategory !== 'All') {
      queryParams.category = this.selectedCategory;
    }
    
    if (this.selectedYear !== 'All') {
      queryParams.year = this.selectedYear;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: '' // Replace all params
    });
  }

  /** Clear all filters */
  clearFilters(): void {
    this.selectedCategory = 'All';
    this.selectedYear = 'All';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  }

  /** Check if any filter is active */
  get hasActiveFilters(): boolean {
    return this.selectedCategory !== 'All' || this.selectedYear !== 'All';
  }

  /** Toggle read more state for an item */
  toggleReadMore(item: WorkItem): void {
    item.readMoreOpen = !item.readMoreOpen;
  }

  /** TrackBy function for ngFor performance optimization */
  trackByTitle(index: number, item: WorkItem): string {
    return item.title;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showScrollTop = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
