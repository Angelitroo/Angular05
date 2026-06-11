import {Component, importProvidersFrom, inject, OnInit} from '@angular/core';
import {Footer} from '../footer/footer';
import {Navbar} from '../navbar/navbar';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import { Event } from '../models/event';
import {EventService} from '../services/event.service';
import {DatePipe} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-addevent',
  standalone: true,
  imports: [
    Footer,
    Navbar,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './addevent.html',
  styleUrls: ['./addevent.css'],


})
export class Addevent implements OnInit{
  private eventService = inject(EventService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = false;
  dateString: string = '';

  eventId: string | null = null;


  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');

    if (this.eventId) {
      this.isEditMode = true;

      this.eventService.getEventById(this.eventId)
        .pipe(take(1))
        .subscribe(eventData => {
          this.event = eventData;
          this.dateString = this.formatDateForInput(eventData.date);
        });
    }
  }

  event: Event = {
    id: "",
    title: '',
    date: new Date(),
    time: '',
    location: '',
    image: '',
    description: '',
    dresscode: '',
    price: 0,
    tickets: 0
  };

  constructor() {
  }


  resetForm() {
    this.event = {
      id: "",
      title: '',
      date: new Date(),
      time: '',
      location: '',
      image: '',
      description: '',
      dresscode: '',
      price: 0,
      tickets: 0,
    };
  }

  addEvent() {
    const eventDate = new Date(this.dateString);

    if (!this.event.title
      || isNaN(eventDate.getTime())
      || !this.event.time
      || !this.event.location
      || !this.event.image
      || !this.event.description
      || this.event.dresscode === ""
      || this.event.price == null
      || this.event.tickets == null) {
      alert("Por favor, complete los campos obligatorios.");
      return;
    }

    this.event.date = eventDate;

    this.eventService.addEvent(this.event).then(
      data => {
        console.log("saved data", data);
        this.resetForm();
      }
    ).catch(err => {
      alert('Error al crear el evento: ' + err);
    });
  }

  updateEvent() {
    if (!this.eventId) return;

    const eventDate = new Date(this.dateString);

    const { id, ...eventWithoutId } = {
      ...this.event,
      date: eventDate
    };

    this.eventService.updateEvent(this.eventId, eventWithoutId)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(err => {
        console.error(err);
        alert('Error al actualizar el evento');
      });
  }

  formatDateForInput(date: Date | string): string {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }
}
