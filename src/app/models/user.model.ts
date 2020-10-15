export class User {

    userID:string;


    constructor(public nom: string,
                public prenom: string, 
                public adresse: string,
                public codePostal: number,
                public ville: string, 
                public siret: string, 
                public ape: string, 
                public numeroTVA: string, 
                public mail: string, 
                public telephone: string, 
                public iban: string, 
                public bic: string
                ) {}
}