import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Facture } from '../../models/facture.model';
import { FacturesService } from '../../services/factures.service';
import { Router } from '@angular/router';
import { Contrat } from '../../models/contrat.model';
import { ContratService } from '../../services/contrat.service';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;


@Component({
  selector: 'app-facture-form',
  templateUrl: './facture-form.component.html',
  styleUrls: ['./facture-form.component.css']
})
export class FactureFormComponent implements OnInit {
  contrats: Contrat[];
  contratsSubscription : Subscription;
  invoiceNumber:number;
  factureForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private facturesService: FacturesService,
              private router: Router, private contratService: ContratService) { }
              
  ngOnInit() {
    this.initForm();
    this.contratsSubscription = this.contratService.contratsSubject.subscribe(
      (contrats: Contrat[]) => {
        this.contrats = contrats;
      }
    );
    this.contratService.emitContrats();
  }
  
  initForm() {
    this.factureForm = this.formBuilder.group({
      date: ['', Validators.required],
      mois: ['', Validators.required],
      jours: [10, Validators.required],
      contrat: ['']
    });

    this.getInvoiceNumber(10);

  }

  getInvoiceNumber(startNumber:number){
    let invoiceNumber:number;
    let numberOfInvoices:number;
    firebase.database().ref('/factures/').once('value').then(
      (data: DataSnapshot) => {
        numberOfInvoices = data.val().length;
        if(numberOfInvoices == 0){
          invoiceNumber = startNumber++;
        } else {
          invoiceNumber = startNumber + numberOfInvoices + 1;
        }
        this.invoiceNumber = invoiceNumber;
      }
    );

  }
  
  onSaveFacture() {
    const numero = this.invoiceNumber;
    let date = this.factureForm.get('date').value;
    //Change date format to dd-mm-yyyy
    const jour = date.slice(8,10);
    const moisDate = date.slice(5,7);
    const annee = date.slice(0,4);
    date = jour + "-" + moisDate + "-" + annee;
    const mois = this.factureForm.get('mois').value;
    const jours = this.factureForm.get('jours').value;
    const contrat = this.factureForm.get('contrat').value;
    const newFacture = new Facture(numero, mois, jours);
    newFacture.date = date;
    newFacture.contratId = contrat.reference;
    newFacture.clientId = contrat.clientId;
    newFacture.tjm = contrat.tjm;
    this.facturesService.createNewFacture(newFacture);
    this.router.navigate(['/factures']);
  }

}

