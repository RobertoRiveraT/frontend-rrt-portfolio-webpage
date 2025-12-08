import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

// Routing
import { ChatbotRoutingModule } from './chatbot-routing.module';

// Components
import { ChatbotRedirectComponent } from './chatbot-redirect.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    ChatbotRedirectComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatbotRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ]
})
export class ChatbotModule { }

