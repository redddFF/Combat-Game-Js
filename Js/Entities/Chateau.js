class Chateau {
    
    constructor(color) {
        this.guerriers = [];
        this.ressources = 3;
        this.fileAttente = [];
        this.color=color;
    }

     instantiateWarriors() {
        const warriorTypes = [Nain, Elfe, ChefElfe, ChefNain];
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * warriorTypes.length);
            const randomWarrior = new warriorTypes[randomIndex]();
            this.guerriers.push(randomWarrior);
        }
    }


   
}
