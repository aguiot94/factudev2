export class Contrat {
    constructor(public reference: string,
                public contact: string,
                public prestation: string, 
                public mois: string,
                public tva: boolean,
                public tjm: number){}
}