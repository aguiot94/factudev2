import { Contrat } from './contrat.model';

export class Facture {

date: string;
deplacement: number;
astreintes: number;
contratId: number;
tjm: number;
total: number;
clientId: string;
userID:string;

    constructor(public numero: Number, 
                public mois: String, 
                public jours: Number
                ) {}
}