import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContratService } from '../services/contrat.service';
import { Contrat } from '../models/contrat.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contrat-list',
  templateUrl: './contrat-list.component.html',
  styleUrls: ['./contrat-list.component.css']
})
export class ContratListComponent implements OnInit, OnDestroy {

  contrats: Contrat[];
  contratsSubscription: Subscription;

  constructor(private contratService: ContratService,
              private router: Router) { }

  ngOnInit(){
    this.contratsSubscription = this.contratService.contratsSubject.subscribe(
      (contrats: Contrat[]) => {
        this.contrats = contrats;
      }
    );
    this.contratService.emitContrats();
  }

  onNewContrat() {
    this.router.navigate(['/contrats', 'new']);
  }

  onDeleteContrat(contrat: Contrat){
    this.contratService.removeContrat(contrat);
  }

  onViewContrat(id: number){
    this.router.navigate(['/contrats', 'view', id]);
  }

  ngOnDestroy(){
    this.contratsSubscription.unsubscribe();
  }

}
