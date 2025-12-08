/**
 * ApiService - Centralized API calls for the chatbot backend
 * Authentication headers are automatically handled by AuthInterceptor
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

// Global window type extension for runtime environment override
declare global {
  interface Window {
    __env?: {
      baseUrl?: string;
    };
  }
}

// Response interfaces for type safety
export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ApiResponse {
  message?: string;
  detail?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  /** Get base URL with runtime override support */
  private get baseUrl(): string {
    return window?.__env?.baseUrl || environment.baseUrl;
  }

  // ============================================
  // AUTHENTICATION
  // ============================================

  /**
   * Register a new user
   */
  register(email: string, password: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/register`, { email, password });
  }

  /**
   * Login user and store JWT token
   */
  login(email: string, password: string): Observable<LoginResponse> {
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, body.toString(), { headers }).pipe(
      tap((response) => {
        // Store token using AuthService
        this.authService.setToken(response.access_token);
      })
    );
  }

  // ============================================
  // ACCOUNT MANAGEMENT
  // ============================================

  /**
   * Update user email
   * Note: Authorization header is automatically added by AuthInterceptor
   */
  updateEmail(newEmail: string): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/update-email`, { new_email: newEmail });
  }

  /**
   * Update user password
   */
  updatePassword(newPassword: string): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/update-password`, { new_password: newPassword });
  }

  /**
   * Delete user account
   */
  deleteAccount(): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/delete-account`).pipe(
      tap(() => {
        // Clear token on successful deletion
        this.authService.clearToken();
      })
    );
  }

  // ============================================
  // CHAT FUNCTIONALITY
  // ============================================

  /**
   * Get chat history for current user
   */
  getChatHistory(): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.baseUrl}/chat-history`);
  }

  /**
   * Send a message to the chatbot
   */
  sendMessageToBot(message: string): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.baseUrl}/chat`, { content: message });
  }

  /**
   * Get all messages (if implemented in backend)
   * @deprecated Use getChatHistory instead
   */
  getMessages(): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.baseUrl}/messages`);
  }
}
