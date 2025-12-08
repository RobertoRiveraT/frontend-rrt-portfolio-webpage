import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuOpen = false;
  isLoggedIn = false;
  
  private authSubscription?: Subscription;
  private routerSubscription?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      (loggedIn) => this.isLoggedIn = loggedIn
    );

    // Close menu on route change
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.menuOpen = false;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.routerSubscription?.unsubscribe();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  goTo(route: string): void {
    this.router.navigate([route]);
    this.menuOpen = false;
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  goToAccount(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/chatbot/account']);
    } else {
      this.router.navigate(['/chatbot/login']);
    }
    this.menuOpen = false;
  }
}