import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { Facture } from '../../models/facture.model';
import { Contrat } from '../../models/contrat.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturesService } from '../../services/factures.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { jsPDF } from 'jspdf'; 
import html2canvas from 'html2canvas';  
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import html2pdf from 'html2pdf.js'
import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  selector: 'app-single-facture',
  templateUrl: './single-facture.component.html',
  styleUrls: ['./single-facture.component.css']
})
export class SingleFactureComponent implements OnInit {

  facture: Facture;
  clientInfos;
  contratInfos;
  UserInfos: User;
  totalTTC: string;
  totalHT:string;
  montantTVA: string;
  annee;
  tjm:string;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private facturesService: FacturesService,
              private userService: UserService) { 
                
              }

  ngOnInit() {
    this.facture = new Facture(0, "", 0);
    const id = this.route.snapshot.params['id'];
    this.facturesService.getSingleFacture(+id).then(
      (facture: Facture) => {
        this.facture = facture;
        this.getClient();
        this.getContrat();
        this.getTotal();
        this.annee = new Date().getFullYear();
      }
    );


    //Récupère les informations de l'utilisateur
    this.userService.getUser().then(
      (user: User) => {
        this.UserInfos = user;
      }
    );

  }
  


  getClient(){
    const ref = firebase.database().ref('clients/');
    ref.orderByChild('mail').equalTo(this.facture.clientId).on('child_added', (data: DataSnapshot) => {
      this.clientInfos =  data.val();
    });
}

/*getContrat(){
  const ref = firebase.database().ref('contrats/');
  ref.orderByChild('reference').equalTo(this.facture.contratId).on('child_added', (data: DataSnapshot) => {
    this.contratInfos =  data.val();
  });
}*/

getContrat(){
  return new Promise(
    (resolve, reject) => {
      const ref = firebase.database().ref('contrats/');
  ref.orderByChild('reference').equalTo(this.facture.contratId).on('child_added', (data: DataSnapshot) => {
    this.contratInfos = data.val();
    resolve(data.val());
  });
    }
  );
}


  onBack() {
    this.router.navigate(['/factures']);
  }

  getTotal() {
    const factureJours = Number(this.facture.jours);
    this.getContrat().then(
      (contrat: Contrat) => {
        if(!contrat.tva) {
          let factureTotal = factureJours * this.facture.tjm;
          //Formate avec 2 décimales (type string)
          this.totalHT = factureTotal.toFixed(2);
          this.tjm = this.facture.tjm.toFixed(2);
        } else {
          let factureTotal = factureJours * this.facture.tjm;
          this.totalHT = factureTotal.toFixed(2);
          this.tjm = this.facture.tjm.toFixed(2);
          //Calcule le montant TTC
          let totalTTC = Number(this.totalHT) * 1.2;
          this.totalTTC = totalTTC.toFixed(2);
         //Calcule le montant de la TVA
          let montantTVA = Number(this.totalHT) * 0.2;
          this.montantTVA = montantTVA.toFixed(2);
        }
        
      }
    );
  }


  public genPDF()  
  {  
    var data = document.body;  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  }  






  


}
