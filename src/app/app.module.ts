import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { EmailComponent } from './components/email/email.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    EmailComponent,
    NavBarComponent,
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomePageComponent, pathMatch: 'full' },
      { path: 'email', component: EmailComponent },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
