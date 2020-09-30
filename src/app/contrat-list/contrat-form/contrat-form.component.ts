import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contrat } from '../../models/contrat.model';
import { ContratService } from '../../services/contrat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contrat-form',
  templateUrl: './contrat-form.component.html',
  styleUrls: ['./contrat-form.component.css']
})
export class ContratFormComponent implements OnInit {

  contratForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private contratService: ContratService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.contratForm = this.formBuilder.group({
      reference: ['', Validators.required],
      contact: '',
      prestation: ['', Validators.required],
      mois: ['', Validators.required],
      tva: true,
      tjm: [0, Validators.required]
    });
  }

  onSaveContrat() {
    const reference = this.contratForm.get('reference').value;
    const contact = this.contratForm.get('contact').value;
    const prestation = this.contratForm.get('prestation').value;
    const mois = this.contratForm.get('mois').value;
    const tva = this.contratForm.get('tva').value;
    const tjm = this.contratForm.get('tjm').value;
    const newContrat = new Contrat(reference, contact, prestation, mois, tva, tjm);
    this.contratService.createNewContrat(newContrat);
    this.router.navigate(['/contrats']);

  }

}
