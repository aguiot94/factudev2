import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Client } from '../models/client.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clients: Client[] = [];
  clientSubject = new Subject<Client[]>();

  emitClients() {
    this.clientSubject.next(this.clients);
  }

  saveClients() {
    firebase.database().ref('/clients').set(this.clients);
  }

  getClients() {
    firebase.database().ref('/clients').on('value', (data: DataSnapshot) => {
      this.clients = data.val() ? data.val() : [];
      this.emitClients;
    });
  }

  getSingleClient(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/clients/' + id).once('value').then(
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

  createNewClient(newClient: Client) {
    this.clients.push(newClient);
    this.saveClients();
    this.emitClients();
  }

  removeClient(client: Client) {
    const clientIndexToRemove = this.clients.findIndex(
      (clientEL) => {
      if(clientEL === client) {
        return true;
      }
    }
    );
    this.clients.splice(clientIndexToRemove, 1);
    this.saveClients();
    this.emitClients();
  }

  constructor() { 
    this.getClients();
  }
}
