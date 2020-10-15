import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      siret: ['', Validators.required],
      ape: ['', Validators.required],
      numeroTVA: ['', Validators.required],
      mail: ['', Validators.required],
      telephone: ['', Validators.required],
      iban: ['', Validators.required],
      bic: ['', Validators.required]
    });
  }

  onSaveUser(){
    const nom = this.userForm.get('nom').value;
    const prenom = this.userForm.get('prenom').value;
    const adresse = this.userForm.get('adresse').value;
    const codePostal = this.userForm.get('codePostal').value;
    const ville = this.userForm.get('ville').value;
    const siret = this.userForm.get('siret').value;
    const ape = this.userForm.get('ape').value;
    const numeroTVA = this.userForm.get('numeroTVA').value;
    const mail = this.userForm.get('mail').value;
    const telephone = this.userForm.get('telephone').value;
    const iban = this.userForm.get('iban').value;
    const bic = this.userForm.get('bic').value;
    const newUser = new User(nom, prenom, adresse, codePostal, ville, siret, ape, numeroTVA, mail, telephone, iban, bic);
    newUser.userID = firebase.auth().currentUser.uid;
    this.userService.createNewUser(newUser);
    this.router.navigate(['/user']);
  }

}
