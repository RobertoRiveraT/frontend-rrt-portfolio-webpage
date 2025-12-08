import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Core Navigation Components (eagerly loaded)
import { HomeComponent } from './pages/home/home.component';
import { AboutmeComponent } from './pages/aboutme/aboutme.component';
import { MyworkComponent } from './pages/mywork/mywork.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  // Core Navigation - Eagerly Loaded (main pages)
  { path: 'home', component: HomeComponent },
  { path: 'aboutme', component: AboutmeComponent },
  { path: 'mywork', component: MyworkComponent },
  { path: 'contact', component: ContactComponent },
  
  // Chatbot Module - Lazy Loaded
  { 
    path: 'chatbot', 
    loadChildren: () => import('./pages/chatbot/chatbot.module').then(m => m.ChatbotModule) 
  },
  
  // Games Module - Lazy Loaded
  { 
    path: 'games', 
    loadChildren: () => import('./pages/games/games.module').then(m => m.GamesModule) 
  },
  
  // Wildcard - redirect invalid routes to home
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // Restore scroll position on navigation
    anchorScrolling: 'enabled' // Enable anchor scrolling
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
