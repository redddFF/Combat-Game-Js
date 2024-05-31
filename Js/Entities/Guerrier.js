class Guerrier {
    constructor(type, force, pointsDeVie, cout, defMul) {
        this.type = type;
        this.force = force;
        this.pointsDeVie = pointsDeVie;
        this.cout = cout;
        this.defMul = defMul;
    }

    async attack(file) {
        let r = dice(this.force, 3);
        do {
            let enemy = file[0];
            console.log(`Le guerrier ${enemy.type} est attaqué.`);
            let degat = r / (enemy.defMul);
            enemy.pointsDeVie -= degat;
            if (enemy.pointsDeVie <= 0) {
                showPopupMessage(`Le guerrier ${enemy.type} est mort !`);
                file.shift();
                console.log(`Le guerrier ${enemy.type} est mort !`);
                // Trigger popup message for 500ms
                
                await delay(500);
                // Hide the popup after 500ms
                hidePopup();
                r = -enemy.pointsDeVie;
            }
        } while (r > 0 && file.length > 0);
    }
}
