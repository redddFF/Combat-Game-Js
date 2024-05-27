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
        <button onclick="modeTraining(BlueCastle, RedCastle)">Training</button>
        <button onclick="startRandom()">Start Random</button>
    `;
}

function startGame() {
    BlueCastle = new Chateau('blue');
    RedCastle = new Chateau('red');

    console.log(BlueCastle);
    console.log(RedCastle);
    displayModes(BlueCastle, RedCastle);
}

function exitGame() {
    console.log('Game exited!');
}

function startRandom() {
    console.log('Random mode started!');
}

function modeTraining(BlueCastle, RedCastle) {
    var popupContent = document.querySelector('.popup');
    popupContent.innerHTML = `
        <h2>Select Warrior Type to Train</h2>
        <p>Resources: ${BlueCastle.ressources}</p>
        <form id="trainingForm">
            <label for="fighter1">First Fighter :</label>
            <select id="fighter1">
                <option value="nain">Nain</option>
                <option value="chefNain">Chef Nain</option>
                <option value="elfe">Elfe</option>
                <option value="chefElfe">Chef Elfe</option>
            </select><br><br>

            <label for="fighter2">Second Fighter:</label>
            <select id="fighter2">
                <option value="nain">Nain</option>
                <option value="chefNain">Chef Nain</option>
                <option value="elfe">Elfe</option>
                <option value="chefElfe">Chef Elfe</option>
            </select><br><br>

            <label for="fighter3">Third Fighter:</label>
            <select id="fighter3">
                <option value="nain">Nain</option>
                <option value="chefNain">Chef Nain</option>
                <option value="elfe">Elfe</option>
                <option value="chefElfe">Chef Elfe</option>
            </select><br><br>

            <label for="fighter4">Fourth Fighter:</label>
            <select id="fighter4">
                <option value="nain">Nain</option>
                <option value="chefNain">Chef Nain</option>
                <option value="elfe">Elfe</option>
                <option value="chefElfe">Chef Elfe</option>
            </select><br><br>
            
            <button type="button" onclick="submitTraining(BlueCastle)">Submit</button>
        </form>
        <br><br>
    `;
    addWarriorToQueueRandom(RedCastle);
}

function submitTraining(BlueCastle) {
    var fighter1 = document.getElementById('fighter1').value;
    var fighter2 = document.getElementById('fighter2').value;
    var fighter3 = document.getElementById('fighter3').value;
    var fighter4 = document.getElementById('fighter4').value;

    addWarriorToQueue(fighter1, BlueCastle);
    addWarriorToQueue(fighter2, BlueCastle);
    addWarriorToQueue(fighter3, BlueCastle);
    addWarriorToQueue(fighter4, BlueCastle);
    
    console.log('File d attente updated:', BlueCastle.fileAttente);
    displayFileAttente(BlueCastle, RedCastle);
}

function startFight(BlueCastle, RedCastle) {
    hidePopup();
    createPlateau(BlueCastle, RedCastle);
}

function fillPlateau(BlueCastle, plateau) {
    while (BlueCastle.ressources > 0 && BlueCastle.fileAttente.length > 0 && BlueCastle.ressources >= BlueCastle.fileAttente[0].cout) {
        const nextWarrior = BlueCastle.fileAttente[0];
        
        BlueCastle.ressources -= nextWarrior.cout;
        BlueCastle.guerriers.push(nextWarrior);
        plateau.carreaux[4].guerriersBleu.push(nextWarrior); // Add to plateau
        BlueCastle.fileAttente.shift(); // Remove the trained warrior from the queue

        console.log(`Trained ${nextWarrior.constructor.name}`);
        console.log(`Resources remaining: ${BlueCastle.ressources}`);
        console.log('Current warriors on the plateau of blue:', plateau.carreaux[4].guerriersBleu);
    }
    if (BlueCastle.ressources <= 0) {
        console.log('Not enough resources to train the next warrior');
    } else {
        console.log('No warriors in the queue');
    }
    //fightingProcess(plateau);
}

function fillPlateauRed(RedCastle, plateau) {
    while (RedCastle.ressources > 0 && RedCastle.fileAttente.length > 0 && RedCastle.ressources >= RedCastle.fileAttente[0].cout) {
        const nextWarrior = RedCastle.fileAttente[0];
        
        RedCastle.ressources -= nextWarrior.cout;
        RedCastle.guerriers.push(nextWarrior);
        plateau.carreaux[0].guerriersRouge.push(nextWarrior); // Add to plateau
        RedCastle.fileAttente.shift(); // Remove the trained warrior from the queue

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

function addWarriorToQueueRandom(RedCastle) {
    const types = ['nain', 'chefNain', 'elfe', 'chefElfe'];
    
    // Ensure the first warrior is not a chef elfe
    let firstWarriorType;
    do {
        firstWarriorType = types[Math.floor(Math.random() * types.length)];
    } while (firstWarriorType === 'chefElfe');
    
    addWarriorToQueueByType(firstWarriorType, RedCastle);
    
    // Add three more random warriors
    for (let i = 0; i < 3; i++) {
        const randomType = types[Math.floor(Math.random() * types.length)];
        addWarriorToQueueByType(randomType, RedCastle);
    }
    
    console.log('Final queue of red:', RedCastle.fileAttente);
}

function addWarriorToQueueByType(type, RedCastle) {
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

    RedCastle.fileAttente.push(warrior);
    console.log(`Added ${type} to queue of red `);
    console.log(RedCastle.fileAttente);
}


function displayFileAttente(BlueCastle, RedCastle) {
    var popupContent = document.querySelector('.popup');
    var content = "<h2>File Attente</h2><ul>";
    BlueCastle.fileAttente.forEach(function (warrior) {
        content += `<li>Type: ${warrior.type}, Force: ${warrior.force}, Points de Vie: ${warrior.pointsDeVie}</li>`;
    });
    content += `
          </ul>
          <button onclick="startFight(BlueCastle,RedCastle)">Start Fight</button>
    `;
    popupContent.innerHTML = content;
}

function hidePopup() {
    document.getElementById('overlay').style.display = 'none';
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

function createPlateau(BlueCastle, RedCastle) {
    plateau = new Plateau();
    plateau.instantiateCarreaux(5);
    fillPlateau(BlueCastle, plateau);
    fillPlateauRed(RedCastle, plateau);
    
    displayWarriors(plateau);
    console.log(plateau);
}







function fightingProcess(plateau){
   
    moveGuerriersBleus(plateau);
    moveGuerriersRouges(plateau);
   
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
