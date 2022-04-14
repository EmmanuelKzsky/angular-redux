import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
    public firestore: AngularFirestore) { }

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      console.log(fuser);
    })
  }

  async crearUsuario(nombre: string, email: string, password: string) {
    const { user } = await this.auth.createUserWithEmailAndPassword(email, password);
    const newUser = new User(nombre, email, user?.uid);
    return this.firestore.doc(`${user?.uid}/user`).set({ ...newUser });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(map(fbUser => fbUser !== null));
  }
}
