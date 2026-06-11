// home.ts
import {Component, inject, OnInit} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { Event } from '../models/event';
import { EventService } from '../services/event.service';
import {AuthService} from '../services/auth.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  imports: [
    Navbar,
    Footer,
    CommonModule,
    RouterLink
  ],
  providers: [DatePipe],
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  private eventService = inject(EventService);
  private authService = inject(AuthService);
  selectedEventId: string | null | undefined = null;


  esAdmin: boolean = false;

  eventList: Event[] = [];

  constructor() {
    this.eventService.getAllEvents().subscribe(
      data => {
        this.eventList = data;
      }
    )
  }


  ngOnInit(): void {
    this.authService.authState$.pipe(take(1)).subscribe(currentUser => {
      if (!currentUser) return;

      this.authService.getUserById(currentUser.uid).pipe(take(1)).subscribe(userData => {
        this.esAdmin = userData.role === 'admin';
      });
    });
  }

  deleteEvent() {
    if (!this.selectedEventId) return;

    this.eventService.deleteEvent(this.selectedEventId).then(() => {
      this.eventList = this.eventList.filter(e => e.id !== this.selectedEventId);
      this.selectedEventId = null;
    });
  }



}
