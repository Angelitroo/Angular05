import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import {AuthService} from '../services/auth.service';
import {take} from 'rxjs/operators';
import { updatePassword, verifyBeforeUpdateEmail} from '@angular/fire/auth';

@Component({
  selector: 'app-modificarperfil',
  imports: [FormsModule, Navbar, Footer],
  templateUrl: './modificarperfil.html',
  styleUrls: ['./modificarperfil.css'],
})
export class Modificarperfil {
  private authService = inject(AuthService);

  nombre: string = '';
  apellido: string = '';
  email: string = '';
  password: string = '';

  fotoDefault: string = '';
  fotoActual: string = "";
  fotoUrl: string = '';

  constructor() {

  }

  ngOnInit(): void {
    this.authService.authState$.pipe(take(1)).subscribe(currentUser => {
      if (!currentUser) return;

      this.authService.getUserById(currentUser.uid).pipe(take(1)).subscribe(user => {
        this.nombre = user.firstname;
        this.apellido = user.lastname;
        this.email = currentUser.email || '';

        this.fotoDefault = user.fotoUrl;
        this.fotoUrl = user.fotoUrl;
        this.actualizarPreview();
      });
    });
  }

  actualizarPreview() {
    this.fotoActual = this.fotoUrl ? this.fotoUrl : this.fotoDefault;
  }

  guardarCambios() {
    this.authService.authState$.pipe(take(1)).subscribe(async currentUser => {
      if (!currentUser) return;

      try {
        //Primero el usuario de firestore
        const firestoreData: any = {
          firstname: this.nombre,
          lastname: this.apellido,
          fotoUrl: this.fotoUrl
        };

        if (this.fotoUrl == "" || this.nombre == "" || this.apellido == "" ) {
          alert("No puedes dejar la foto, el nombre o el apellido vacíos");
          return;
        }

        await this.authService.updateUser(currentUser.uid, firestoreData);

        //Ahora lo que es el usuario de autenticación (email y password)
        if (this.email !== currentUser.email) {
          await verifyBeforeUpdateEmail(currentUser, this.email);
          await this.authService.logout();
          alert('Te hemos enviado un email para confirmar el cambio de correo');
          return;
        }

        if (this.password?.trim()) {
          await updatePassword(currentUser, this.password);
        }
        alert('Perfil actualizado correctamente');
      } catch (err) {
        console.error(err);
        alert('Error al actualizar el perfil');
      }
    });
  }
}

