import { Injectable, Injector, runInInjectionContext} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
  authState
} from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User as UserModel } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    public auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private injector: Injector,
  ) {}

  // Obtener el estado actual de autenticación como observable
  get authState$() {
    return runInInjectionContext(this.injector, () => {
      return authState(this.auth);
    });
  }

  //Metodo de login
  async login(email: string, password: string) {
    return runInInjectionContext(this.injector, async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
        const user = userCredential.user;

        localStorage.setItem("token", "true");

        if (user.emailVerified) {
          await this.router.navigate(['/home']);
        } else {
          await this.router.navigate(['/verifyemail']);
        }
      } catch (err: any) {
        alert("Login Failed: " + err.message);
        await this.router.navigate(['/login']);
      }
    });
  }

  //Metodo de registro
  async register(email: string, password: string, fotoUrl: string, nombre: string, apellido: string) {
    return runInInjectionContext(this.injector, async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
        const user = userCredential.user;

        // Usamos el model de user
        const userModel: UserModel = {
          email,
          fotoUrl: fotoUrl,
          firstname: nombre,
          lastname: apellido,
          role: 'user',
          createdAt: new Date()
        };

        // Guardamos el usuario en Firestore
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        await setDoc(userDocRef, userModel);

        await sendEmailVerification(user);
        await this.router.navigate(['/verifyemail']);
      } catch (err: any) {
        alert("Register Failed: " + err.message);
      }
    });
  }


  //Metodo de logout cerrar sesión
  async logout() {
    return runInInjectionContext(this.injector, async () => {
      try {
        await signOut(this.auth);
        localStorage.removeItem("token");
        await this.router.navigate(['/login']);
      } catch (err: any) {
        alert("Logout Failed: " + err.message);
      }
    });
  }

  //Metodo envio de link para resetear contraseña
  async forgotPassword(email: string) {
    return runInInjectionContext(this.injector, async () => {
      try {
        await sendPasswordResetEmail(this.auth, email);
        await this.router.navigate(['/verifyemail']);
      } catch (err: any) {
        alert("Something went wrong: " + err.message);
      }
    });
  }

  //Metodo envio link para verificar email
  async sendEmailForVerification(user: User) {
    return runInInjectionContext(this.injector, async () => {
      try {
        await sendEmailVerification(user);
        await this.router.navigate(['/verifyemail']);
      } catch (err: any) {
        alert("Something went wrong. Not able to send email: " + err.message);
      }
    });
  }

  //Metodo guard verificar existencia token
  isAuthenticated(): boolean {
    return runInInjectionContext(this.injector, () => {
      const token = localStorage.getItem('token');
      return token === 'true';
    });
  }

  //Metodo obtener usuario por id
  getUserById(uid: string): Observable<UserModel> {
    return runInInjectionContext(this.injector, () => {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      return docData(userDocRef, { idField: 'id' }) as Observable<UserModel>;
    });
  }

  //Metodo actualizar datos del usuario
  async updateUser(uid: string, data: Partial<UserModel>) {
    return runInInjectionContext(this.injector, async () => {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      await setDoc(userDocRef, data, { merge: true });
    });
  }
}
