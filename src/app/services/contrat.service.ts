import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Contrat } from '../models/contrat.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()

export class ContratService {

  contrats: Contrat[];
  contratsSubject = new Subject<Contrat[]>();
  userID = firebase.auth().currentUser.uid;

  emitContrats(){
    this.contratsSubject.next(this.contrats);
  }

  saveContrats(){
    firebase.database().ref('/contrats/' + this.userID).set(this.contrats);
  }

  getContrats(){
    firebase.database().ref('/contrats/' + this.userID).on('value', (data: DataSnapshot) => {
      this.contrats = data.val() ? data.val() : [];
    });
  }

  getSingleContrat(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/contrats/' + this.userID + "/" + id).once('value').then(
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

  createNewContrat(newContrat: Contrat) {
    this.contrats.push(newContrat);
    this.saveContrats();
    this.emitContrats();
  }

  removeContrat(contrat: Contrat){
    const contratIndexToRemove = this.contrats.findIndex(
      (contratEl) => {
        if(contratEl === contrat ){
          return true;
        }
      }
    );
    if(confirm('Êtes-vous sur de vouloir supprimer ce contrat ?')){
      this.contrats.splice(contratIndexToRemove, 1);
    this.saveContrats();
    this.emitContrats();
    } else {
      return false;
    }
    
  }

  constructor() { 
    this.getContrats();
  }
}
