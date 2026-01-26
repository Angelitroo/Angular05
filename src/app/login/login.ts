import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [
    RouterLink,
    FormsModule
  ],
  styleUrls: ['./login.css']
})
export class Login {

  email: string = '';
  password: string = '';

  iniciarSesion() {
    console.log('Login:' + this.email + ' ' + this.password);
  }


}
