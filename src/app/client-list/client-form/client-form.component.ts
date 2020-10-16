import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  clientForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private clientService: ClientService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.clientForm = this.formBuilder.group({
      nom: ['', Validators.required],
      contact: ['', Validators.required],
      mail: ['', Validators.required],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required]
    });
  }

  onSaveClient(){
    const nom = this.clientForm.get('nom').value;
    const contact = this.clientForm.get('contact').value;
    const mail = this.clientForm.get('mail').value;
    const telephone = this.clientForm.get('telephone').value;
    const adresse = this.clientForm.get('adresse').value;
    const newClient = new Client(nom, adresse, mail, telephone, contact);
    newClient.userID = firebase.auth().currentUser.uid;
    this.clientService.createNewClient(newClient);
    this.router.navigate(['/clients']);
  }


}
