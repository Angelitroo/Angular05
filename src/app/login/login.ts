import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Navbarintro} from '../navbarintro/navbarintro';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    Navbarintro,
  ],
  styleUrls: ['./login.css']
})
export class Login {

  email: string = '';
  password: string = '';

  constructor(private router: Router,
              private authService : AuthService) { }

  iniciarSesion() {
    if(this.email === '' || this.password === '') {
      alert("Por favor, complete todos los campos.");
      return;
    }
    this.authService.login(this.email, this.password);
    this.email = "";
    this.password = "";

  }
}
