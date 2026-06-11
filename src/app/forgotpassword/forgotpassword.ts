import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Navbarintro} from "../navbarintro/navbarintro";
import {RouterLink} from "@angular/router";
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-forgotpassword',
    imports: [
        FormsModule,
        Navbarintro,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './forgotpassword.html',
  styleUrl: './forgotpassword.css',
})
export class Forgotpassword {
  email: string = '';

  constructor(private authService : AuthService,) { }

  forgotPassword() {
    if (this.email === '') {
      alert("Por favor, ingrese su correo electrónico.");
      return;
    }

    this.authService.forgotPassword(this.email);
    this.email = "";
  }

}
