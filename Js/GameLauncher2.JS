let BlueCastle;
let RedCastle;
let plateau;
let tour = 1;


function showPopupMessage(message) {
    showPopup()
    var popupContent = document.querySelector('.popup');
    popupContent.innerHTML = `
        <h2>${message}</h2>
    `;
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
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
    
        <div class="button-container">
       
            <button onclick="modeTrainingPOPUP(BlueCastle, RedCastle)">Training</button>
            <button onclick="startRandom()">Start Random</button>
            <button class="buttonGB" onclick="exitGame()">Exit</button>
        </div>
    `;
}


function startGame() {
    BlueCastle = new Chateau('blue');
    RedCastle = new Chateau('red');
    displayModes(BlueCastle, RedCastle);
}

function exitGame() {
    if (confirm('Are you sure you want to exit the game?')) {
        window.close();
    }
}


function startRandom() {
    console.log('Random mode started!');
}

function modeTrainingPOPUP(BlueCastle, RedCastle) {
    BlueCastle.fileAttente = [];
    RedCastle.fileAttente = [];
    var popupContent = document.querySelector('.popup');
    popupContent.innerHTML = `
        <h2>SELECT WORRIER TYPE TO TRAIN </h2>
        <p><strong>Nain:</strong> <span style="border: 1px solid black; padding: 2px;">1 point</span>    <strong>Chef nain:</strong> <span style="border: 1px solid black; padding: 2px;">2 points</span>    <strong>Elfe:</strong> <span style="border: 1px solid black; padding: 2px;">3 points</span>    <strong>Chef Elfe:</strong> <span style="border: 1px solid black; padding: 2px;">4 points</span></p>

        <div class="castle-forms">
            <div class="castle-form">
                <h3>Blue Castle</h3>
                <p>Resources: ${BlueCastle.ressources}</p>
                <form id="trainingFormBlue">
                    <label for="blueFighter1">First Fighter:</label>
                    <select id="blueFighter1">
                        <option value="nain">Nain</option>
                        <option value="chefNain">Chef Nain</option>
                        <option value="elfe">Elfe</option>
                  
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
            </div>

            <div class="castle-form">
                <h3>Red Castle</h3>
                <p>Resources: ${RedCastle.ressources}</p>
                <form id="trainingFormRed">
                    <label for="redFighter1">First Fighter:</label>
                    <select id="redFighter1">
                        <option value="nain">Nain</option>
                        <option value="chefNain">Chef Nain</option>
                        <option value="elfe">Elfe</option>

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
            </div>
        </div>
        <br><br>
        <button type="button" class="buttonGB" onclick="displayModes(BlueCastle, RedCastle)">Go Back</button>
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


async function startFight(BlueCastle, RedCastle) {
    showPopupMessage("The game started. Round 1");
    setTimeout(function () {
        hidePopup();
        createPlateau(BlueCastle, RedCastle);
    }, 1000);
}
async function fillPlateau(BlueCastle, plateau) {
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
    await delay(2000);
}


async function fillPlateauRed(RedCastle, plateau) {
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
    await delay(2000);

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
    var content = "";

    // Adding BlueCastle warriors
    content += "<div class='castle-warriors'>";
    content += "<h3>BlueCastle</h3><div class='warriors-container'>";
   
    content += BlueCastle.fileAttente.map(function (warrior) {
        var imgSrc;
        switch (warrior.type) {
            case 'nain':
                imgSrc = "../Assets/Nain.png";
                break;
            case 'chef nain':
                imgSrc = "../Assets/chefNain.png";
                break;
            case 'elfe':
                imgSrc = "../Assets/Elfe.png";
                break;
            case 'chef elfe':
                imgSrc = "../Assets/chefElfe.png";
                break;
            default:
                imgSrc = ""; // Provide a default image or handle it accordingly
        }
        return `
            <div class='warrior'>
                <img src='${imgSrc}' alt='${warrior.type}' class='warrior-image'>
                <div class='warrior-info'>
                    <p>Type: ${warrior.type}</p>
                    <p>Force: ${warrior.force}</p>
                    <p>Points de Vie: ${warrior.pointsDeVie}</p>
                </div>
            </div>
        `;
    }).join('');
    content += "</div></div>"; // Close the warriors-container and castle-warriors divs

    // Adding RedCastle warriors
    content += "<div class='castle-warriors'>";
    content += "<h3>RedCastle</h3><div class='warriors-container'>";
   
    content += RedCastle.fileAttente.map(function (warrior) {
        var imgSrc;
        switch (warrior.type) {
            case 'nain':
                imgSrc = "../Assets/Nain.png";
                break;
            case 'chef nain':
                imgSrc = "../Assets/chefNain.png";
                break;
            case 'elfe':
                imgSrc = "../Assets/Elfe.png";
                break;
            case 'chef elfe':
                imgSrc = "../Assets/chefElfe.png";
                break;
            default:
                imgSrc = ""; // Provide a default image or handle it accordingly
        }
        return `
            <div class='warrior'>
                <img src='${imgSrc}' alt='${warrior.type}' class='warrior-image'>
                <div class='warrior-info'>
                    <p>Type: ${warrior.type}</p>
                    <p>Force: ${warrior.force}</p>
                    <p>Points de Vie: ${warrior.pointsDeVie}</p>
                </div>
            </div>
        `;
    }).join('');
    content += "</div></div>"; // Close the warriors-container and castle-warriors divs

    // Adding the start fight button
    content += `
    <br><br>
        <button class="buttonGB" onclick="modeTrainingPOPUP(BlueCastle, RedCastle)">Go Back</button>
        <button onclick="startFight(BlueCastle, RedCastle)">Start Fight</button>
    `;

    popupContent.innerHTML = content;
}


async function createPlateau(BlueCastle, RedCastle) {
    plateau = new Plateau();
    plateau.instantiateCarreaux(5);
    await fillPlateau(BlueCastle, plateau);
    await fillPlateauRed(RedCastle, plateau);
    displayCastleWarriors(BlueCastle, RedCastle)
    setTimeout(function () {
        startBattle(plateau);
        
        console.log(plateau);
    }, 2000);
    displayWarriors(plateau);
}



function isBattleTriggered() {
    return plateau.carreaux.some(carreau => carreau.guerriersBleu.length > 0 && carreau.guerriersRouge.length > 0);
}

async function startBattle(plateau) {
   
    let battleCarreau;


    while (!isBattleTriggered()) {
        moveGuerriersBleus(plateau);
        moveGuerriersRouges(plateau);
        displayWarriors(plateau);
        displayCastleWarriors(BlueCastle, RedCastle); // Update display after movements

        await delay(3000);
    }

    for (const carreau of plateau.carreaux) {
        if (carreau.guerriersBleu.length > 0 && carreau.guerriersRouge.length > 0) {
            battleCarreau = carreau;
            break;
        }
    }


    while (true) {
        console.log(`Round ${tour}`);
        battleRound(battleCarreau, tour, plateau);
        displayWarriors(plateau);
        displayCastleWarriors(BlueCastle, RedCastle);
        await delay(3000);


        const winner = checkWinner(battleCarreau);
        if (winner) {
            console.log(`${winner} wins the battle!`);
            break;
        }

        tour++;
      

    }


    while (!isEndOfPlateauMovement(plateau)) {
        moveGuerriersBleus(plateau);
        moveGuerriersRouges(plateau);
        displayWarriors(plateau);
        await delay(3000);
    }

    console.log("Battle and movement completed!");
}
function checkWinner(carreau) {
    if (carreau.guerriersBleu.length === 0) {
   
        return "Red";
    } else if (carreau.guerriersRouge.length === 0) {
     
        return "Blue";
    } else {
        return null;
    }
}

async function battleRound(carreau, tour) {
    console.log(`Fight happening in round ${tour}`);


    for (const guerrier of carreau.guerriersRouge) {
        if (carreau.guerriersBleu.length > 0) {
            console.log(`Le guerrier rouge ${guerrier.type} attaque !`);
            guerrier.attack(carreau.guerriersBleu);
            await delay(3000);

        }
    }
    
    for (const guerrier of carreau.guerriersBleu) {
        if (carreau.guerriersRouge.length > 0) {
            console.log(`Le guerrier bleu ${guerrier.type} attaque !`);
            guerrier.attack(carreau.guerriersRouge);
            await delay(3000);
            displayWarriors(plateau)
        }
    }
    
}


function isEndOfPlateauMovement(plateau) {
    const firstCarreau = plateau.carreaux[0];
    const lastCarreau = plateau.carreaux[plateau.carreaux.length - 1];

    const noBlueInFirstCarreau = firstCarreau.guerriersBleu.length === 0;
    const noRedInLastCarreau = lastCarreau.guerriersRouge.length === 0;

    return noBlueInFirstCarreau && noRedInLastCarreau;
}

function displayWarriors(plateau) {
    plateau.carreaux.forEach((carreau, index) => {
        const section = document.getElementById(`section${index}`);
        let content = '';

        carreau.guerriersBleu.forEach(warrior => {
            switch (warrior.type) {
                case 'nain':
                    content += `<img class="warriorfighting" src="../Assets/Nain.png" alt="nain" style="">`;
                    break;
                case 'chef nain':
                    content += `<img class="warriorfighting" src="../Assets/chefNain.png" alt="chef nain" style="">`;
                    break;
                case 'elfe':
                    content += `<img class="warriorfighting" src="../Assets/Elfe.png" alt="elfe" style="">`;
                    break;
                case 'chef elfe':
                    content += `<img class="warriorfighting" src="../Assets/chefElfe.png" alt="chef elfe" style="">`;
                    break;
                default:
                    break;
            }
        });

        carreau.guerriersRouge.forEach(warrior => {
            switch (warrior.type) {
                case 'nain':
                    content += `<img class="warriorfighting" src="../Assets/Nain.png" alt="nain" style="">`;
                    break;
                case 'chef nain':
                    content += `<img class="warriorfighting" src="../Assets/chefNain.png" alt="chef nain" style="">`;
                    break;
                case 'elfe':
                    content += `<img class="warriorfighting" src="../Assets/Elfe.png" alt="elfe" style="">`;
                    break;
                case 'chef elfe':
                    content += `<img class="warriorfighting" src="../Assets/chefElfe.png" alt="chef elfe" style="">`;
                    break;
                default:
                    break;
            }
        });

        section.innerHTML = content;
    });
}


function moveGuerriersBleus(plateau) {
    fillPlateau(BlueCastle, plateau)
    fillPlateauRed(RedCastle, plateau)
    for (let i = plateau.carreaux.length - 1; i > 0; i--) {
        if (plateau.carreaux[i].guerriersBleu.length > 0) {
            const currentCarreau = plateau.carreaux[i];
            const previousCarreau = plateau.carreaux[i - 1];

            // Move all guerriers bleus from the current carreau to the previous one
            previousCarreau.guerriersBleu.push(...currentCarreau.guerriersBleu);
            currentCarreau.guerriersBleu = [];

            // If there are red warriors in the previous carreau, trigger battle
            if (previousCarreau.guerriersRouge.length > 0) {
                battleRound(previousCarreau);
            }
            displayCastleWarriors(BlueCastle, RedCastle);
            console.log(`Moved guerriers bleus from carreau ${i} to carreau ${i - 1}`);
            if(plateau.carreaux[0].guerriersBleu.length > 0){
                displayBlueWon()
            }
            break; // Exit the loop after moving warriors
        }
    }
   
}

function moveGuerriersRouges(plateau) {
    
    for (let i = 0; i < plateau.carreaux.length - 1; i++) {
        if (plateau.carreaux[i].guerriersRouge.length > 0) {
            const currentCarreau = plateau.carreaux[i];
            const nextCarreau = plateau.carreaux[i + 1];


            nextCarreau.guerriersRouge.push(...currentCarreau.guerriersRouge);
            currentCarreau.guerriersRouge = [];

            if (nextCarreau.guerriersBleu.length > 0) {
                battleRound(nextCarreau);
            }
            displayCastleWarriors(BlueCastle, RedCastle);
            console.log(`Moved guerriers rouges from carreau ${i} to carreau ${i + 1}`);
            if(plateau.carreaux[4].guerriersRouge.length > 0){
                displayRedWon()
            }
            break;
        }
}

   
}
function displayRedWon() {
    showPopup()
    var popupContent = document.querySelector('.popup');
    var content = `<h2>Red Warriors Won!</h2>
                   <button  onclick="retry()">Retry</button>
                   <button class="buttonGB" style="background-color: red;" onclick="exitGame()">Exit</button>`;
    popupContent.innerHTML = content;
}

function displayBlueWon() {
    showPopup()
    var popupContent = document.querySelector('.popup');
    var content = `<h2>Blue Warriors Won!</h2>
                   <button  onclick="retry()">Retry</button>
                   <button class="buttonGB" style="background-color: red;" onclick="exitGame()">Exit</button>`;;
    popupContent.innerHTML = content;
}
function retry() {
    window.location.reload();
}


function displayCastleWarriors(BlueCastle, RedCastle) {
    // Get the div elements for displaying warriors
    const blueCastleDiv = document.getElementById('castle-blue');
    const redCastleDiv = document.getElementById('castle-red');

    // Clear the current content
    blueCastleDiv.innerHTML = '';
    redCastleDiv.innerHTML = '';

    // Display BlueCastle warriors
    let blueContent = '<h3>Blue Castle Warriors</h3>';
    BlueCastle.guerriers.forEach(warrior => {
        blueContent += `<div class="warrior-cadre">
            <p>Type: ${warrior.type}</p>
            <p>Force: ${warrior.force}</p>
            <p>Points de Vie: ${warrior.pointsDeVie}</p>
        </div>`;
    });
    blueCastleDiv.innerHTML = blueContent;

    // Display RedCastle warriors
    let redContent = '<h3>Red Castle Warriors</h3>';
    RedCastle.guerriers.forEach(warrior => {
        redContent += `<div class="warrior-cadre">
            <p>Type: ${warrior.type}</p>
            <p>Force: ${warrior.force}</p>
            <p>Points de Vie: ${warrior.pointsDeVie}</p>
        </div>`;
    });
    redCastleDiv.innerHTML = redContent;
}

function displayRetryExitButtons() {
    var popupContent = document.querySelector('.popup');
    var content = `
        <button  onclick="modeTrainingPOPUP()">Retry</button>
        <button class="buttonGB" style="background-color: red;" onclick="exitGame()">Exit</button>
    `;
    popupContent.innerHTML = content;
}

document.addEventListener('DOMContentLoaded', function () {
    showPopup();
});
