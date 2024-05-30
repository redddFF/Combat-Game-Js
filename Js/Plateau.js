class Plateau {

    constructor() {
        this.carreaux = [];
       
        
    }
    instantiateCarreaux(nbCarreaux){
        for (let index = 0; index < nbCarreaux; index++) {
           this.carreaux.push(new Carreau());  
        }
        console.log(this.carreaux);
    }
}