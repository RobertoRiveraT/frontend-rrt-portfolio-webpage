import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * AuthInterceptor - Automatically attaches JWT token to outgoing HTTP requests
 * Also handles 401 unauthorized responses by redirecting to login
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    // Clone request and add authorization header if token exists
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized - clear token and redirect to login
        if (error.status === 401) {
          this.authService.clearToken();
          this.router.navigate(['/chatbot/login']);
        }
        return throwError(() => error);
      })
    );
  }
}

