import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {Navbarintro} from '../navbarintro/navbarintro';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    Navbarintro,
  ],
  styleUrls: ['./register.css']
})
export class Register {
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  password: string = '';

  fotoDefault: string = 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png';
  fotoActual: string = this.fotoDefault;
  fotoUrl: string = '';

  constructor(private authService: AuthService) {}

  actualizarPreview() {
    this.fotoActual = this.fotoUrl?.trim() ? this.fotoUrl : this.fotoDefault;
  }



  registrar() {
    if (!this.email || !this.password || !this.nombre || !this.apellido) {
      alert("Completa todos los campos");
      return;
    }
    this.authService.register(
      this.email,
      this.password,
      this.fotoUrl,
      this.nombre,
      this.apellido
    );
  }
}
