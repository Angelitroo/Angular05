import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  imports: [
    FormsModule,
    RouterLink
  ],
  styleUrls: ['./register.css']
})
export class Register {
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  password: string = '';

  registrar() {
    console.log('Registro:', this.nombre, this.apellido, this.email, this.password);
  }

  goBack() {
    window.history.back();
  }
}
