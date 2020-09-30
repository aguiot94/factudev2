import { Component, OnInit } from '@angular/core';
import { Contrat } from '../../models/contrat.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratService } from '../../services/contrat.service';

@Component({
  selector: 'app-single-contrat',
  templateUrl: './single-contrat.component.html',
  styleUrls: ['./single-contrat.component.css']
})
export class SingleContratComponent implements OnInit {

  contrat: Contrat;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private contratService: ContratService) { }
 
  ngOnInit() {
    this.contrat = new Contrat('', '', '', '', true, 0);
    const id = this.route.snapshot.params['id'];
    this.contratService.getSingleContrat(+id).then(
      (contrat: Contrat) => {
        this.contrat = contrat;
      }
    );
  }

  onBack() {
    this.router.navigate(['/contrats']);
  }

}
