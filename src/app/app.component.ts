import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { PictureCardComponent } from './pages/picture-card/picture-card.component';
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { AuthComponent } from "./pages/auth/auth.component";
import { AuthServiceService } from './services/Auth/auth-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, MatIconModule,
    NavbarComponent,
    FooterComponent,
    PictureCardComponent,
    HomePageComponent, 
    AuthComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-pintorest';

  user: any;

  constructor(public authService: AuthServiceService) { }

  ngOnInit() {
    console.log('app component onInit');
    this.authService.getUserProfile().subscribe({
      next: (data) => {
        if (data) {
          console.log('request user profile', data);

        } else {
          console.error('User profile is null or undefined');
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log('error retrieving user profile', error);

      }
    });
  
    this.authService.authSubject.subscribe(
      (auth) => {
        console.log('auth state', auth);
        if (auth && auth.user) {
          this.user = auth.user;
        } else {
          console.error('Auth object or user is null');
        }
      }
    );
  }
  

}
