import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Facture } from '../models/facture.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FacturesService {

  factures: Facture[] = [];
  facturesSubject = new Subject<Facture[]>();
  userID = firebase.auth().currentUser.uid;

  constructor(private router: Router) { 
    this.getFactures();
  }

  emitFactures() {
    this.facturesSubject.next(this.factures);
  }

saveFactures() {
  firebase.database().ref('/factures/' + this.userID).set(this.factures);
}

getFactures() {
  console.log(this.userID);
  firebase.database().ref('/factures/' + this.userID)
    .on('value', (data: DataSnapshot) => {
        this.factures = data.val() ? data.val() : [];
        this.emitFactures();
      }
    );
}

getSingleFacture(id: number) {
  return new Promise(
    (resolve, reject) => {
      firebase.database().ref('/factures/' + this.userID + "/" + id).once('value').then(
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

createNewFacture(newFacture: Facture) {
  this.factures.push(newFacture);
  this.saveFactures();
  this.emitFactures();
}

removeFacture(facture: Facture){
  const factureIndexToRemove = this.factures.findIndex(
    (factureEl) => {
      if(factureEl === facture){
        return true;
      }
    }
  );
  if(confirm('Êtes-vous sur de vouloir supprimer cette facture ?')){
    this.factures.splice(factureIndexToRemove, 1);
    this.saveFactures();
    this.emitFactures();
  } else {
    return false;
  }
  
}




}
