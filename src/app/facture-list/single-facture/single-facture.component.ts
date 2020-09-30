import { Component, OnInit } from '@angular/core';
import { Facture } from '../../models/facture.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturesService } from '../../services/factures.service';

@Component({
  selector: 'app-single-facture',
  templateUrl: './single-facture.component.html',
  styleUrls: ['./single-facture.component.css']
})
export class SingleFactureComponent implements OnInit {

  facture: Facture;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private facturesService: FacturesService) { }

  ngOnInit() {
    this.facture = new Facture(0, "", 0);
    const id = this.route.snapshot.params['id'];
    this.facturesService.getSingleFacture(+id).then(
      (facture: Facture) => {
        this.facture = facture;
      }
    );
  }

  onBack() {
    this.router.navigate(['/factures']);
  }

}
