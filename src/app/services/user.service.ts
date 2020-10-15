import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User[] = [];
  userSubject = new Subject<User[]>();
  userID = firebase.auth().currentUser.uid;

  emitUser(){
    this.userSubject.next(this.user);
  }

  saveUser(){
    firebase.database().ref('users/' + this.userID).set({
      nom: this.user[0].nom,
      prenom: this.user[0].prenom,
      adresse: this.user[0].adresse,
      codePostal: this.user[0].codePostal,
      ville: this.user[0].ville,
      siret: this.user[0].siret,
      ape: this.user[0].ape,
      numeroTVA: this.user[0].numeroTVA,
      mail: this.user[0].mail,
      telephone: this.user[0].telephone,
      iban: this.user[0].iban,
      bic: this.user[0].bic
    });
  }

  createNewUser(newUser: User) {
    this.user.push(newUser);
    this.saveUser();
    this.emitUser();
  }

getUser(){
  return new Promise(
    (resolve, reject) => {
      firebase.database().ref('/users/' + this.userID).once('value').then(
        (data: DataSnapshot) => {
          resolve(data.val());
        },
        (error) => {
          reject(error);
        }
      );
    }
  );
}



  constructor() { }
}
