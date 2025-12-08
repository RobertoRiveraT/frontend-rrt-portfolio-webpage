import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * AuthService - Centralized authentication state management
 * Handles token storage, login state, and authentication events
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  /** Observable stream of authentication state */
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor() {
    // Listen for storage changes from other tabs
    window.addEventListener('storage', (event) => {
      if (event.key === this.TOKEN_KEY) {
        this.isLoggedInSubject.next(this.hasToken());
      }
    });
  }

  /**
   * Check if user has a valid token stored
   */
  hasToken(): boolean {
    return !!this.getToken();
  }

  /**
   * Get current authentication state synchronously
   */
  isLoggedIn(): boolean {
    return this.hasToken();
  }

  /**
   * Get the stored JWT token
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Store JWT token and update authentication state
   */
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.isLoggedInSubject.next(true);
  }

  /**
   * Clear token and update authentication state (logout)
   */
  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedInSubject.next(false);
  }

  /**
   * Logout user - alias for clearToken with semantic meaning
   */
  logout(): void {
    this.clearToken();
  }
}

