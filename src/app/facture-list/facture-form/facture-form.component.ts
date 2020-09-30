import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Facture } from '../../models/facture.model';
import { FacturesService } from '../../services/factures.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facture-form',
  templateUrl: './facture-form.component.html',
  styleUrls: ['./facture-form.component.css']
})
export class FactureFormComponent implements OnInit {

  factureForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private facturesService: FacturesService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.factureForm = this.formBuilder.group({
      numero: [10, Validators.required],
      mois: ['', Validators.required],
      jours: [10, Validators.required]
    });
  }
  
  onSaveFacture() {
    const numero = this.factureForm.get('numero').value;
    const mois = this.factureForm.get('mois').value;
    const jours = this.factureForm.get('jours').value;
    const newFacture = new Facture(numero, mois, jours);
    this.facturesService.createNewFacture(newFacture);
    this.router.navigate(['/factures']);
  }
}

