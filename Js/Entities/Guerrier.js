class Guerrier {
    constructor(type, force, pointsDeVie, cout, couleur) {
        this.type = type;
        this.force = force;
        this.pointsDeVie = pointsDeVie;
        this.cout = cout;
   
    }

    attaquer() {
       console.log(this.type + "is attacking")
    }

    recevoirDegats(degats) {
        if (this.type === 'nain') {
            degats = Math.floor(degats / 2);
        } else if (this.type === 'chef nain') {
            degats = Math.floor(degats / 4);
        }

        this.pointsDeVie -= degats;
        if (this.pointsDeVie <= 0) {
            console.log(`Le guerrier ${this.type} est mort !`);
        }
    }
}