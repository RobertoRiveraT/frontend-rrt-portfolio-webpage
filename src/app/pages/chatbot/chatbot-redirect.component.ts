import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chatbot-redirect',
  template: ''
})
export class ChatbotRedirectComponent implements OnInit {
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/chatbot/chat']);
    } else {
      this.router.navigate(['/chatbot/login']);
    }
  }
}
