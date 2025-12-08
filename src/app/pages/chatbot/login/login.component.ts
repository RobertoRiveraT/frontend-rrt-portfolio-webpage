import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string | null = null;
  loading = false;
  showWarning = true;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // If already logged in, redirect to chat
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/chatbot/chat']);
    }
  }

  onSubmit(): void {
    this.loginError = null;
    if (this.loginForm.invalid) return;

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.api.login(email, password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/chatbot/chat']);
      },
      error: (err) => {
        this.loading = false;
        this.loginError = err.error?.detail || 'Login failed. Please try again.';
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/chatbot/register']);
  }

  acceptWarning(): void {
    this.showWarning = false;
  }

  goToNextStep(): void {
    this.router.navigate(['/chatbot/register']);
  }
}
