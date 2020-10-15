import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Facture } from '../models/facture.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class FacturesService {

  factures: Facture[] = [];
  facturesSubject = new Subject<Facture[]>();

  constructor() { 
    this.getFactures();
  }

  emitFactures() {
    this.facturesSubject.next(this.factures);
  }

saveFactures() {
  firebase.database().ref('/factures').set(this.factures);
}

getFactures() {
  firebase.database().ref('/factures')
    .on('value', (data: DataSnapshot) => {
        this.factures = data.val() ? data.val() : [];
        this.emitFactures();
      }
    );
}

getSingleFacture(id: number) {
  return new Promise(
    (resolve, reject) => {
      firebase.database().ref('/factures/' + id).once('value').then(
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
  this.factures.splice(factureIndexToRemove, 1);
  this.saveFactures();
  this.emitFactures();
}




}
