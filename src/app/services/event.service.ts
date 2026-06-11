import {Injectable, Injector, runInInjectionContext} from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  collectionData,
  deleteDoc,
  updateDoc,
  docData,
  addDoc
} from '@angular/fire/firestore';
import { Event } from '../models/event';
import {map, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private collecionName = 'Events';

  constructor(private firestore: Firestore,
              private injector : Injector,
              private router: Router,) {}

  // Metodo crear evento
  async addEvent(data: Event): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      const itemsCollection = collection(this.firestore, this.collecionName);
      await addDoc(itemsCollection, data);
      await this.router.navigate(['/home']);
    });
  }

  // Metodo get todos los eventos
  getAllEvents(): Observable<Event[]> {
    return runInInjectionContext(this.injector, () => {
      const itemsCollection = collection(this.firestore, this.collecionName);
      return collectionData(itemsCollection, { idField: 'id' }).pipe(
        map((items: any[]) =>
          items.map((item) => {
            let dateValue = item?.date;
            if (dateValue && typeof dateValue === 'object' && 'seconds' in dateValue && typeof dateValue.seconds === 'number') {
              dateValue = new Date(dateValue.seconds * 1000);
            }
            return { ...item, date: dateValue } as Event;
          })
        )
      );
    });
  }

  // Metodo get evento por id
  getEventById(id: string): Observable<Event> {
    return runInInjectionContext(this.injector, () => {
      const itemDoc = doc(this.firestore, `${this.collecionName}/${id}`);

      return docData(itemDoc, { idField: 'id' }).pipe(
        map((item: any) => {
          let dateValue = item?.date;

          if (dateValue && typeof dateValue === 'object' && 'seconds' in dateValue && typeof dateValue.seconds === 'number') {
            dateValue = new Date(dateValue.seconds * 1000);
          }
          return { ...item, date: dateValue } as Event;
        })
      );
    });
  }


  // Metodo actualizar evento
  async updateEvent(id: string, data: any): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      const itemDoc = doc(this.firestore, `${this.collecionName}/${id}`);
      await updateDoc(itemDoc, data);
    });
  }

  // Metodo eliminar evento
  async deleteEvent(id: string): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      const itemDoc = doc(this.firestore, `${this.collecionName}/${id}`);
      await deleteDoc(itemDoc);
    });
  }



}
