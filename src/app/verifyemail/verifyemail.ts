import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Navbarintro} from '../navbarintro/navbarintro';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-verifyemail',
  imports: [
    FormsModule,
    Navbarintro,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './verifyemail.html',
  styleUrl: './verifyemail.css',
})
export class Verifyemail {

}
