import { Component, OnDestroy, OnInit } from '@angular/core';
import { FacturesService } from '../services/factures.service';
import { Facture } from '../models/facture.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facture-list',
  templateUrl: './facture-list.component.html',
  styleUrls: ['./facture-list.component.css']
})
export class FactureListComponent implements OnInit, OnDestroy {

  factures: Facture[];
  factureSubscription: Subscription;

  constructor(private facturesService: FacturesService,
              private router: Router) { }

  ngOnInit() {
    this.factureSubscription = this.facturesService.facturesSubject.subscribe(
      (factures: Facture[]) => {
        this.factures = factures;
      }
    );
    this.facturesService.emitFactures();
  }

  onNewFacture(){
    this.router.navigate(['/factures','new']);
  }

  onDeleteFacture(facture: Facture) {
    this.facturesService.removeFacture(facture);
  }

  onViewFacture(id: number) {
    this.router.navigate(['/factures','view', id]);
  }

  ngOnDestroy(){
    this.factureSubscription.unsubscribe();
  }

}
