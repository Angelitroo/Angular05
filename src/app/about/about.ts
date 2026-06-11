import { Component } from '@angular/core';
import {Footer} from '../footer/footer';
import {Navbar} from '../navbar/navbar';

@Component({
  selector: 'app-about',
  imports: [
    Footer,
    Navbar
  ],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

}
