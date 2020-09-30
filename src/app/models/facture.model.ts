export class Facture {

date: string;
deplacement: number;
astreintes: number;
contratId: number;

    constructor(public numero: Number, 
                public mois: String, 
                public jours: Number
                ) {}
}