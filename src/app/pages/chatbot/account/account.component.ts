import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  emailForm: FormGroup;
  passwordForm: FormGroup;

  updateMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private authService: AuthService,
    private router: Router
  ) {
    this.emailForm = this.fb.group({
      newEmail: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  updateEmail(): void {
    if (this.emailForm.invalid) return;
    
    const { newEmail } = this.emailForm.value;
  
    this.api.updateEmail(newEmail).subscribe({
      next: () => {
        this.updateMessage = `Email updated to: ${newEmail}`;
        this.errorMessage = null;
        this.emailForm.reset();
      },
      error: (err) => {
        console.error('Error updating email:', err);
        this.updateMessage = null;
        this.errorMessage = err.error?.detail || 'Error updating email.';
      }
    });
  }
  
  updatePassword(): void {
    if (this.passwordForm.invalid) return;
    
    const { newPassword } = this.passwordForm.value;
  
    this.api.updatePassword(newPassword).subscribe({
      next: () => {
        this.updateMessage = 'Password updated successfully';
        this.errorMessage = null;
        this.passwordForm.reset();
      },
      error: (err) => {
        console.error('Error updating password:', err);
        this.updateMessage = null;
        this.errorMessage = err.error?.detail || 'Error updating password.';
      }
    });
  }  

  deleteAccount(): void {
    const confirmed = confirm('Are you sure you want to delete your account? This action is irreversible.');
    if (!confirmed) return;
  
    this.api.deleteAccount().subscribe({
      next: () => {
        this.updateMessage = 'Account deleted successfully.';
        // AuthService handles token clearing via the API service
        this.router.navigate(['/chatbot/login']);
      },
      error: (err) => {
        console.error('Error deleting account:', err);
        this.errorMessage = err.error?.detail || 'Error deleting account.';
      }
    });
  }

  goToChat(): void {
    this.router.navigate(['/chatbot/chat']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/chatbot/login']);
  }
}
