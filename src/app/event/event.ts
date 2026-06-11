import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {DatePipe, NgIf} from '@angular/common';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { EventService } from '../services/event.service';
import { Event as EventModel } from '../models/event';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [Navbar, Footer, RouterLink, DatePipe, NgIf],
  templateUrl: './event.html',
  styleUrl: './event.css',
})
export class Event implements OnInit {

  private route = inject(ActivatedRoute);
  private eventService = inject(EventService);

  event!: EventModel;

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');

    if (eventId) {
      this.eventService.getEventById(eventId).subscribe(event => {
        this.event = event;
      });
    }
  }
}
