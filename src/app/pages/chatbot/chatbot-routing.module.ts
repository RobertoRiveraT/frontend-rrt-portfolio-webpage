import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatbotRedirectComponent } from './chatbot-redirect.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { ChatComponent } from './chat/chat.component';

import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  { path: '', component: ChatbotRedirectComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatbotRoutingModule { }

