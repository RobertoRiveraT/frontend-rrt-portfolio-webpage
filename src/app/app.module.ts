import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './pages/chatbot/chat/chat.component';
import { LoginComponent } from './pages/chatbot/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { RegisterComponent } from './pages/chatbot/register/register.component';
import { AccountComponent } from './pages/chatbot/account/account.component';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutmeComponent } from './pages/aboutme/aboutme.component';
import { MyworkComponent } from './pages/mywork/mywork.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ChatbotRedirectComponent } from './pages/chatbot/chatbot-redirect.component';
import { WorkCardComponent } from './components/work-card/work-card.component';
import { UnityPlatformerComponent } from './pages/games/unity-platformer/unity-platformer.component';
import { PenguinTwitchBattleComponent } from './pages/games/penguin-twitch-battle/penguin-twitch-battle.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    HeaderComponent,
    HomeComponent,
    AboutmeComponent,
    MyworkComponent,
    ContactComponent,
    ChatbotRedirectComponent,
    WorkCardComponent,
    UnityPlatformerComponent,
    PenguinTwitchBattleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
