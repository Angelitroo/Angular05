import { Component } from '@angular/core';
import { Location } from '@angular/common'; // Para hacer goBack
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
  standalone: true,
  imports: [RouterModule]
})
export class Footer {

  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
