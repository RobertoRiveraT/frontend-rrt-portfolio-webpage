import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Root Component
import { AppComponent } from './app.component';

// Shared/Core Components (eagerly loaded)
import { HeaderComponent } from './components/header/header.component';
import { WorkCardComponent } from './components/work-card/work-card.component';

// Page Components (eagerly loaded - main navigation)
import { HomeComponent } from './pages/home/home.component';
import { AboutmeComponent } from './pages/aboutme/aboutme.component';
import { MyworkComponent } from './pages/mywork/mywork.component';
import { ContactComponent } from './pages/contact/contact.component';

// Angular Material Modules (only what's needed for core components)
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    // Root
    AppComponent,
    // Shared Components
    HeaderComponent,
    WorkCardComponent,
    // Core Pages (eagerly loaded)
    HomeComponent,
    AboutmeComponent,
    MyworkComponent,
    ContactComponent
  ],
  imports: [
    // Angular Core
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    // Routing
    AppRoutingModule,
    // Angular Material (core only)
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    // HTTP Interceptor for automatic token injection
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
