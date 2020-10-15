import { Client } from '../models/client.model';

export class Contrat {

    clientId: string;

    constructor(public reference: string,
                public contact: string,
                public prestation: string, 
                public mois: string,
                public tva: boolean,
                public tjm: number){
                }
}