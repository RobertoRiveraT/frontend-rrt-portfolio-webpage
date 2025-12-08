import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-work-card',
  templateUrl: './work-card.component.html',
  styleUrls: ['./work-card.component.css']
})
export class WorkCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() bullets!: string[];
  @Input() readMoreText?: string;
  @Input() link?: string;
  @Input() thumbnail?: string;
  @Input() startDate!: string;
  @Input() endDate?: string;
  @Input() category!: string[]; 
  @Input() cardColor!: 'blue' | 'green';

  readMoreOpen = false;
  isModalOpen = false;
  showShareTooltip = false;
  shareTooltipMessage = '';

  toggleReadMore(): void {
    this.readMoreOpen = !this.readMoreOpen;
  }

  openImageModal(): void {
    this.isModalOpen = true;
  }

  closeImageModal(): void {
    this.isModalOpen = false;
  }

  /** Generate a shareable URL for this specific project */
  getShareUrl(): string {
    // Create a URL-friendly slug from the title
    const slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Get the base URL
    const baseUrl = window.location.origin;
    
    // Return URL with the project title as a hash
    return `${baseUrl}/mywork#${slug}`;
  }

  /** Get plain text description (strip HTML) */
  getPlainDescription(): string {
    const temp = document.createElement('div');
    temp.innerHTML = this.description;
    return temp.textContent || temp.innerText || '';
  }

  /** Share the project using Web Share API or copy to clipboard */
  async shareProject(): Promise<void> {
    const shareUrl = this.getShareUrl();
    const shareTitle = this.title.replace(/<[^>]*>/g, ''); // Strip HTML from title
    const shareText = `Check out this project: ${shareTitle}`;

    // Try Web Share API first (mobile/modern browsers)
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl
        });
        this.showTooltip('Shared successfully!');
      } catch (err) {
        // User cancelled or error - fallback to clipboard
        if ((err as Error).name !== 'AbortError') {
          this.copyToClipboard(shareUrl);
        }
      }
    } else {
      // Fallback: copy to clipboard
      this.copyToClipboard(shareUrl);
    }
  }

  /** Copy URL to clipboard */
  private async copyToClipboard(url: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(url);
      this.showTooltip('Link copied!');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.showTooltip('Link copied!');
    }
  }

  /** Show tooltip with message */
  private showTooltip(message: string): void {
    this.shareTooltipMessage = message;
    this.showShareTooltip = true;
    setTimeout(() => {
      this.showShareTooltip = false;
    }, 2000);
  }
}
