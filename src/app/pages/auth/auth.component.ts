import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UpdatePictureFormComponent } from '../update-picture-form/update-picture-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';  // Importar FormsModule
import { MatRadioModule } from '@angular/material/radio';
import { AuthServiceService } from '../../services/Auth/auth-service.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, UpdatePictureFormComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  isRegister = true;

  constructor(public authService: AuthServiceService) { }

  registerationForm = new FormGroup({
    fullName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
  })

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  })

  handleRegister() {
    console.log("register", this.registerationForm.value);

    this.authService.register(this.registerationForm.value).subscribe({
      next:(response)=>{
        localStorage.setItem('jwt', response.jwt);
        this.authService.getUserProfile().subscribe();
        console.log("signup success", response);
      }
    })
  }

  handleLogin() {
    console.log("login", this.loginForm.value);
    
    this.authService.login(this.loginForm.value).subscribe({
      next:(response)=>{
        localStorage.setItem('jwt', response.jwt);
        this.authService.getUserProfile().subscribe();
        console.log("login success", response);
      }
    })

  }

  togglePanel() {
    this.isRegister = !this.isRegister;
  }
}
