import { Component, OnInit, OnDestroy } from '@angular/core';
import { Client } from '../models/client.model';
import { ClientService}  from '../services/client.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, OnDestroy {

  clients: Client[];
  clientsSubscription: Subscription;

  constructor(private router: Router,
              private clientService: ClientService) { }

  ngOnInit() {
    this.clientsSubscription = this.clientService.clientSubject.subscribe(
      (clients: Client[]) => {
        this.clients = clients;
      }
    );
    this.clientService.emitClients();
  }

  onNewClient() {
    this.router.navigate(['/clients', 'new']);
  }

  onDeleteClient(client: Client) {
    this.clientService.removeClient(client);
  }

  onViewClient(id: number) {
    this.router.navigate(['clients/', 'view', id]);
  }

  ngOnDestroy(){
    this.clientsSubscription.unsubscribe();
  }

}
