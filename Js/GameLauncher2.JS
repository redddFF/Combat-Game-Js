let BlueCastle;
let RedCastle;
let plateau;

function showPopup() {
    document.getElementById('overlay').style.display = 'flex';
}

function hidePopup() {
    document.getElementById('overlay').style.display = 'none';
}

function displayModes(BlueCastle, RedCastle) {
    var popupContent = document.querySelector('.popup');
    popupContent.innerHTML = `
        <h2>Select Game Mode</h2>
        <p>Resources: ${BlueCastle.ressources}</p>
        <button onclick="exitGame()">Exit</button>
        <button onclick="modeTrainingPOPUP(BlueCastle, RedCastle)">Training</button>
        <button onclick="startRandom()">Start Random</button>
    `;
}

function startGame() {
    BlueCastle = new Chateau('blue');
    RedCastle = new Chateau('red');
    displayModes(BlueCastle, RedCastle);
}

function exitGame() {
    console.log('Game exited!');
}

function startRandom() {
    console.log('Random mode started!');
}

function modeTrainingPOPUP(BlueCastle, RedCastle) {
    var popupContent = document.querySelector('.popup');
    popupContent.innerHTML = `
        <h2>Select Warrior Type to Train</h2>

        <h3>BlueCastle</h3>
        <p>Resources: ${BlueCastle.ressources}</p>
        <form id="trainingFormBlue">
            <label for="blueFighter1">First Fighter:</label>
            <select id="blueFighter1">
                <option value="nain">Nain</option>
                <option value="chefNain">Chef Nain</option>
                <option value="elfe">Elfe</option>
                <option value="chefElfe">Chef Elfe</option>
            </select><br><br>

            <label for="blueFighter2">Second Fighter:</label>
            <select id="blueFighter2">
                <option value="nain">Nain</option>
                <option value="chefNain">Chef Nain</option>
                <option value="elfe">Elfe</option>
                <option value="chefElfe">Chef Elfe</option>
            </select><br><br>

            <label for="blueFighter3">Third Fighter:</label>
            <select id="blueFighter3">
                <option value="nain">Nain</option>
                <option value="chefNain">Chef Nain</option>
                <option value="elfe">Elfe</option>
                <option value="chefElfe">Chef Elfe</option>
            </select><br><br>

            <label for="blueFighter4">Fourth Fighter:</label>
            <select id="blueFighter4">
                <option value="nain">Nain</option>
                <option value="chefNain">Chef Nain</option>
                <option value="elfe">Elfe</option>
                <option value="chefElfe">Chef Elfe</option>
            </select><br><br>
        </form>

        <h3>RedCastle</h3>
        <p>Resources: ${RedCastle.ressources}</p>
        <form id="trainingFormRed">
            <label for="redFighter1">First Fighter:</label>
            <select id="redFighter1">
                <option value="nain">Nain</option>
                <option value="chefNain">Chef Nain</option>
                <option value="elfe">Elfe</option>
                <option value="chefElfe">Chef Elfe</option>
            </select><br><br>

            <label for="redFighter2">Second Fighter:</label>
            <select id="redFighter2">
                <option value="nain">Nain</option>
                <option value="chefNain">Chef Nain</option>
                <option value="elfe">Elfe</option>
                <option value="chefElfe">Chef Elfe</option>
            </select><br><br>

            <label for="redFighter3">Third Fighter:</label>
            <select id="redFighter3">
                <option value="nain">Nain</option>
                <option value="chefNain">Chef Nain</option>
                <option value="elfe">Elfe</option>
                <option value="chefElfe">Chef Elfe</option>
            </select><br><br>

            <label for="redFighter4">Fourth Fighter:</label>
            <select id="redFighter4">
                <option value="nain">Nain</option>
                <option value="chefNain">Chef Nain</option>
                <option value="elfe">Elfe</option>
                <option value="chefElfe">Chef Elfe</option>
            </select><br><br>
        </form>

        <button type="button" onclick="submitTraining(BlueCastle, RedCastle)">Submit</button>
        <br><br>
    `;
}

function submitTraining(BlueCastle, RedCastle) {
    var blueFighter1 = document.getElementById('blueFighter1').value;
    var blueFighter2 = document.getElementById('blueFighter2').value;
    var blueFighter3 = document.getElementById('blueFighter3').value;
    var blueFighter4 = document.getElementById('blueFighter4').value;

    var redFighter1 = document.getElementById('redFighter1').value;
    var redFighter2 = document.getElementById('redFighter2').value;
    var redFighter3 = document.getElementById('redFighter3').value;
    var redFighter4 = document.getElementById('redFighter4').value;

    addWarriorToQueue(blueFighter1, BlueCastle);
    addWarriorToQueue(blueFighter2, BlueCastle);
    addWarriorToQueue(blueFighter3, BlueCastle);
    addWarriorToQueue(blueFighter4, BlueCastle);

    addWarriorToQueue(redFighter1, RedCastle);
    addWarriorToQueue(redFighter2, RedCastle);
    addWarriorToQueue(redFighter3, RedCastle);
    addWarriorToQueue(redFighter4, RedCastle);

    console.log('BlueCastle queue updated:', BlueCastle.fileAttente);
    console.log('RedCastle queue updated:', RedCastle.fileAttente);

    displayFileAttente(BlueCastle, RedCastle);
}


function startFight(BlueCastle, RedCastle) {
    showPopupMessage("The game started. Round 1");
    setTimeout(function() {
        hidePopup();
        
    }, 2000); 
    
    createPlateau(BlueCastle, RedCastle);
}

function fillPlateau(BlueCastle, plateau) {
    // Determine the last index of carreaux
    const lastCarreauIndex = plateau.carreaux.length - 1;

    while (BlueCastle.ressources > 0 && BlueCastle.fileAttente.length > 0 && BlueCastle.ressources >= BlueCastle.fileAttente[0].cout) {
        const nextWarrior = BlueCastle.fileAttente[0];
        
        BlueCastle.ressources -= nextWarrior.cout;
        BlueCastle.guerriers.push(nextWarrior);
        plateau.carreaux[lastCarreauIndex].guerriersBleu.push(nextWarrior); 
        console.log('****Current state of BLUEEEE****', plateau)
        BlueCastle.fileAttente.shift(); 

        console.log(`Trained ${nextWarrior.constructor.name}`);
        console.log(`Resources remaining: ${BlueCastle.ressources}`);
        console.log('Current warriors on the plateau of blue:', plateau.carreaux[lastCarreauIndex].guerriersBleu);
    }
    if (BlueCastle.ressources <= 0) {
        console.log('Not enough resources to train the next warrior');
    } else if (BlueCastle.fileAttente.length === 0) {
        console.log('No warriors in the queue');
    }
}


function fillPlateauRed(RedCastle, plateau) {
    while (RedCastle.ressources > 0 && RedCastle.fileAttente.length > 0 && RedCastle.ressources >= RedCastle.fileAttente[0].cout) {
        const nextWarrior = RedCastle.fileAttente[0];
        
        RedCastle.ressources -= nextWarrior.cout;
        RedCastle.guerriers.push(nextWarrior);
        plateau.carreaux[0].guerriersRouge.push(nextWarrior); 
        RedCastle.fileAttente.shift(); 

        console.log(`Trained ${nextWarrior.constructor.name}`);
        console.log(`Resources remaining: ${RedCastle.ressources}`);
        console.log('Current warriors on the plateau of red:', plateau.carreaux[0].guerriersRouge);
    }
    if (RedCastle.ressources <= 0) {
        console.log('Not enough resources to train the next warrior');
    } else {
        console.log('No warriors in the queue');
    }
    fightingProcess(plateau);
}

function addWarriorToQueue(type, BlueCastle) {
    let warrior;
    switch (type) {
        case 'nain':
            warrior = new Nain();
            break;
        case 'chefNain':
            warrior = new ChefNain();
            break;
        case 'elfe':
            warrior = new Elfe();
            break;
        case 'chefElfe':
            warrior = new ChefElfe();
            break;
        default:
            console.log('Unknown warrior type');
            return;
    }

    BlueCastle.fileAttente.push(warrior);
    console.log(BlueCastle.fileAttente);
}

function displayFileAttente(BlueCastle, RedCastle) {
    var popupContent = document.querySelector('.popup');
    var content = "<h2>File Attente</h2>";

    content += "<h3>BlueCastle</h3><ul>";
    BlueCastle.fileAttente.forEach(function (warrior) {
        content += `<li>Type: ${warrior.type}, Force: ${warrior.force}, Points de Vie: ${warrior.pointsDeVie}</li>`;
    });
    content += "</ul>";

    content += "<h3>RedCastle</h3><ul>";
    RedCastle.fileAttente.forEach(function (warrior) {
        content += `<li>Type: ${warrior.type}, Force: ${warrior.force}, Points de Vie: ${warrior.pointsDeVie}</li>`;
    });
    content += "</ul>";

    content += `
        <button onclick="startFight(BlueCastle, RedCastle)">Start Fight</button>
    `;

    popupContent.innerHTML = content;
}


function createPlateau(BlueCastle, RedCastle) {
    plateau = new Plateau();
    plateau.instantiateCarreaux(5);
    fillPlateau(BlueCastle, plateau);
    fillPlateauRed(RedCastle, plateau);
    setTimeout(function() {
        displayWarriors(plateau);
        console.log(plateau);
    }, 2000); 
}
function showPopupMessage(message) {
    var popupContent = document.querySelector('.popup');
    popupContent.innerHTML = `
        <h2>${message}</h2>
    `;
}
function fightingProcess(plateau){
   
  //  moveGuerriersBleus(plateau);
  //  moveGuerriersRouges(plateau);
   
}


function displayWarriors(plateau) {
    plateau.carreaux.forEach((carreau, index) => {
        const section = document.getElementById(`section${index}`);
        let content = '';
        
        carreau.guerriersBleu.forEach(warrior => {
            switch (warrior.type) {
                case 'nain':
                    content += `<img class="warrior" src="../Assets/Nain.png" alt="nain">`;
                    break;
                case 'chef nain':
                    content += `<img class="warrior" src="../Assets/chefNain.png" alt="chef nain">`;
                    break;
                case 'elfe':
                    content += `<img class="warrior" src="../Assets/Elfe.png" alt="elfe">`;
                    break;
                case 'chef elfe':
                    content += `<img class="warrior" src="../Assets/chefElfe.png" alt="chef elfe">`;
                    break;
                default:
                    break;
            }
        });

        carreau.guerriersRouge.forEach(warrior => {
            switch (warrior.type) {
                case 'nain':
                    content += `<img class="warrior" src="../Assets/Nain.png" alt="nain">`;
                    break;
                case 'chef nain':
                    content += `<img class="warrior" src="../Assets/chefNain.png" alt="chef nain">`;
                    break;
                case 'elfe':
                    content += `<img class="warrior" src="../Assets/Elfe.png" alt="elfe">`;
                    break;
                case 'chef elfe':
                    content += `<img class="warrior" src="../Assets/chefElfe.png" alt="chef elfe">`;
                    break;
                default:
                    break;
            }
        });

        section.innerHTML = content;
    });
}

function moveGuerriersBleus(plateau) {
    for (let i = plateau.carreaux.length - 1; i > 0; i--) {
        if (plateau.carreaux[i].guerriersBleu.length > 0) {
            const currentCarreau = plateau.carreaux[i];
            const previousCarreau = plateau.carreaux[i - 1];

            // Move all guerriers bleus from the current carreau to the previous one
            previousCarreau.guerriersBleu.push(...currentCarreau.guerriersBleu);
            currentCarreau.guerriersBleu = [];

            console.log(`Moved guerriers bleus from carreau ${i} to carreau ${i - 1}`);
            break; // Exit the loop after moving warriors
        }
    }

    console.log('State after moving guerriers bleus:', JSON.stringify(plateau, null, 2));
}

function moveGuerriersRouges(plateau) {
    for (let i = 0; i < plateau.carreaux.length - 1; i++) {
        if (plateau.carreaux[i].guerriersRouge.length > 0) {
            const currentCarreau = plateau.carreaux[i];
            const nextCarreau = plateau.carreaux[i + 1];

            // Move all guerriers rouges from the current carreau to the next one
            nextCarreau.guerriersRouge.push(...currentCarreau.guerriersRouge);
            currentCarreau.guerriersRouge = [];

            console.log(`Moved guerriers rouges from carreau ${i} to carreau ${i + 1}`);
            break; // Exit the loop after moving warriors
        }
    }

    console.log('State after moving guerriers rouges:', JSON.stringify(plateau, null, 2));
}


document.addEventListener('DOMContentLoaded', function () {
    showPopup();
});
