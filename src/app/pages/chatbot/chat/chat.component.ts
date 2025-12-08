import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, ChatMessage as ApiChatMessage } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

interface DisplayMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: DisplayMessage[] = [];
  newMessage = '';
  loading = false;

  @ViewChild('scrollMe') private chatContainer!: ElementRef;

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // AuthGuard handles authentication check, but double-check here
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/chatbot/login']);
      return;
    }
    this.loadMessages();
  }

  loadMessages(): void {
    this.api.getChatHistory().subscribe({
      next: (res: ApiChatMessage[]) => {
        this.messages = res.map((msg) => ({
          sender: msg.role === 'assistant' ? 'bot' : 'user',
          text: this.linkify(msg.content),
          timestamp: new Date(msg.timestamp)
        }));
        setTimeout(() => this.scrollToBottom(), 100);
      },
      error: (err) => {
        console.error('Error loading chat history:', err);
      }
    });
  }

  sendMessage(): void {
    const content = this.newMessage.trim();
    if (!content) return;

    const userMsg: DisplayMessage = {
      sender: 'user',
      text: this.linkify(content),
      timestamp: new Date()
    };
    this.messages.push(userMsg);
    this.newMessage = '';
    this.scrollToBottom();

    this.loading = true;

    this.api.sendMessageToBot(content).subscribe({
      next: (res: ApiChatMessage) => {
        const botMsg: DisplayMessage = {
          sender: res.role === 'assistant' ? 'bot' : 'user',
          text: this.linkify(res.content),
          timestamp: new Date(res.timestamp)
        };
        this.messages.push(botMsg);
        this.loading = false;
        this.scrollToBottom();
      },
      error: (err) => {
        console.error('Error sending message:', err);
        this.loading = false;
      }
    });
  }

  private linkify(text: string): string {
    const urlRegex = /((https?:\/\/)|(www\.))[^\s]+/g;
    return text.replace(urlRegex, (url) => {
      let fullUrl = url;
      if (!url.startsWith('http')) {
        fullUrl = 'https://' + url;
      }
      const display = url.replace(/^https?:\/\//, '');
      return `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer">${display}</a>`;
    });
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll failed:', err);
    }
  }

  goToNextStep(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/chatbot/account']);
    } else {
      alert('You need to create an account or log in before continuing to the next step.');
      this.router.navigate(['/chatbot/login']);
    }
  }
}
