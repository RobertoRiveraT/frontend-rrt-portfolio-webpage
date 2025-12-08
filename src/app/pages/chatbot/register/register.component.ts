import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerError: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // If already logged in, redirect to chat
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/chatbot/chat']);
    }
  }

  onSubmit(): void {
    this.registerError = null;
    if (this.registerForm.invalid) return;

    this.loading = true;
    const { email, password } = this.registerForm.value;

    this.api.register(email, password).subscribe({
      next: () => {
        this.loading = false;
        // After successful registration, login automatically
        this.api.login(email, password).subscribe({
          next: () => this.router.navigate(['/chatbot/chat']),
          error: () => this.router.navigate(['/chatbot/login'])
        });
      },
      error: (err) => {
        this.loading = false;
        this.registerError = err.error?.detail || 'Could not create account.';
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/chatbot/login']);
  }

  goToNextStep(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/chatbot/chat']);
    } else {
      alert('You need to create an account or log in before continuing to the next step.');
      this.router.navigate(['/chatbot/login']);
    }
  }
}
