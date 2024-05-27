
let BlueCastle;
let RedCastle;

function showPopup() {
    document.getElementById('overlay').style.display = 'flex';
}
function hidePopup() {
    document.getElementById('overlay').style.display = 'none';
}

function displayModes(BlueCastle,RedCastle) {
    var popupContent = document.querySelector('.popup');
    popupContent.innerHTML = `
        <h2>Select Game Mode</h2>
        <p>Resources: ${BlueCastle.ressources}</p>
        <button onclick="exitGame()">Exit</button>
        <button onclick="modeTraining(BlueCastle,RedCastle)">Training</button>
        <button onclick="startRandom()">Start Random</button>
    `;
}

function startGame() {
    BlueCastle = new Chateau('blue');
    RedCastle = new Chateau('red');
    RedCastle.instantiateWarriors();
    BlueCastle.instantiateWarriors();
    console.log(BlueCastle)
    console.log(RedCastle)
    displayModes(BlueCastle,RedCastle);
}

function exitGame() {
    console.log('Game exited!');
}



function startRandom() {
    console.log('Random mode started!');
}











function trainNain(BlueCastle) {    
        if (BlueCastle.guerriers[0].cout <= BlueCastle.ressources) {
            BlueCastle.ressources -= BlueCastle.guerriers[0].cout;
            BlueCastle.fileAttente.push(BlueCastle.guerriers[0]);
            console.log("Added nain to file attente");
            console.log("BlueCastle resources remaining: " + BlueCastle.ressources);
            console.log(BlueCastle.fileAttente);
        } else {
            console.log("ERROR HAPPENED ");
        }  
}

function trainElfe(BlueCastle) {
    const elfeBtn = document.getElementById("trainElfeBtn");
    elfeBtn.setAttribute("disabled", true);

    var hasElfe = BlueCastle.fileAttente.some(function (warrior) {
        return warrior.type === 'elfe';
    });

    if (hasElfe) {
        console.log("There is already an 'elfe' in the file attente");
    } else {
        if (BlueCastle.guerriers[1].cout <= BlueCastle.ressources) {
            BlueCastle.ressources -= BlueCastle.guerriers[1].cout;
            BlueCastle.fileAttente.push(BlueCastle.guerriers[1]);
            console.log("Added elfe to file attente");
            console.log("BlueCastle resources remaining: " + BlueCastle.ressources);
            console.log(BlueCastle.fileAttente);
        } else {
            console.log("Failed, maybe not enough resources for elfe");
        }
    }
    elfeBtn.remove(); // Remove the button after it's clicked
}

function trainChefElfe(BlueCastle) {
    const chefElfeBtn = document.getElementById("trainChefElfeBtn");
    chefElfeBtn.setAttribute("disabled", true);

    var hasChefElfe = BlueCastle.fileAttente.some(function (warrior) {
        return warrior.type === 'chef elfe';
    });

    if (hasChefElfe) {
        console.log("There is already a 'chef elfe' in the file attente");
    } else {
        if (BlueCastle.guerriers[2].cout <= BlueCastle.ressources) {
            BlueCastle.ressources -= BlueCastle.guerriers[2].cout;
            BlueCastle.fileAttente.push(BlueCastle.guerriers[2]);
            console.log("Added chef elfe to file attente");
            console.log("BlueCastle resources remaining: " + BlueCastle.ressources);
            console.log(BlueCastle.fileAttente);
        } else {
            console.log("Failed, maybe not enough resources for chef elfe");
        }
    }
    chefElfeBtn.remove(); // Remove the button after it's clicked
}

function trainChefNain(BlueCastle) {
    const chefNainBtn = document.getElementById("trainChefNainBtn");
    chefNainBtn.setAttribute("disabled", true);

    var hasChefNain = BlueCastle.fileAttente.some(function (warrior) {
        return warrior.type === 'chef nain';
    });

    if (hasChefNain) {
        console.log("There is already a 'chef nain' in the file attente");
    } else {
        if (BlueCastle.guerriers[3].cout <= BlueCastle.ressources) {
            BlueCastle.ressources -= BlueCastle.guerriers[3].cout;
            BlueCastle.fileAttente.push(BlueCastle.guerriers[3]);
            console.log("Added chef nain to file attente");
            console.log("BlueCastle resources remaining: " + BlueCastle.ressources);
            console.log(BlueCastle.fileAttente);
        } else {
            console.log("Failed, maybe not enough resources for chef nain");
        }
    }
    chefNainBtn.remove(); // Remove the button after it's clicked
}
function trainRandomWarriors(castle) {
    const warriorTypes = ['nain', 'elfe', 'chef nain', 'chef elfe'];
    const availableGuerriers = castle.guerriers.slice();
    let totalResources = castle.ressources;

    while (totalResources > 0 && availableGuerriers.length > 0) {
        const randomTypeIndex = Math.floor(Math.random() * warriorTypes.length);
        const warriorType = warriorTypes[randomTypeIndex];

        const warrior = availableGuerriers.find(warrior => warrior.type === warriorType);

        if (warrior && warrior.cout <= totalResources) {
            totalResources -= warrior.cout;
            castle.fileAttente.push(warrior);
            console.log(`Added ${warrior.type} to file attente`);
            console.log(`Castle resources remaining: ${totalResources}`);
        }

        availableGuerriers.splice(availableGuerriers.indexOf(warrior), 1);
    }

    console.log("Final File Attente: ", castle.fileAttente);
}




function displayFileAttente(BlueCastle,RedCastle) {
    var popupContent = document.querySelector('.popup');
    var content = "<h2>File Attente</h2><ul>";
    BlueCastle.fileAttente.forEach(function(warrior) {
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

function startFight(BlueCastle,RedCastle){
hidePopup();
createPlateau(BlueCastle,RedCastle);

}




function fillPlateau(BlueCastle,plateau){
    for (let index = 0; index < BlueCastle.fileAttente.length; index++) {
        plateau.carreaux[0].guerriersBleu.push(BlueCastle.fileAttente[index])
        
    }
    console.log(plateau.carreaux[0].guerriersBleu)
}

function instantiateWarriorsGUI(BlueCastle, plateau) {
    let section5 = document.getElementById("section5");
    let content = "";

    for (let i = 0; i < plateau.carreaux[0].guerriersBleu.length; i++) {
        let warrior = plateau.carreaux[0].guerriersBleu[i];
        switch(warrior.type) {
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
    }

    section5.innerHTML = content;
}

function fillPlateauRed(RedCastle, plateau){
    for (let index = 0; index < RedCastle.fileAttente.length; index++) {
        plateau.carreaux[4].guerriersRouge.push(RedCastle.fileAttente[index])
    }
    console.log(plateau.carreaux[4].guerriersRouge);
}

function instantiateWarriorsGUIRed(RedCastle, plateau) {
    let section1 = document.getElementById("section1");
    let content = "";

    for (let i = 0; i < plateau.carreaux[4].guerriersRouge.length; i++) {
        let warrior = plateau.carreaux[4].guerriersRouge[i];
        switch(warrior.type) {
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
    }

    section1.innerHTML = content;
}

function createPlateau(BlueCastle, RedCastle) {
    let plateau = new Plateau();
    plateau.instantiateCarreaux(5);
    fillPlateau(BlueCastle, plateau);
    fillPlateauRed(RedCastle, plateau);
    instantiateWarriorsGUI(BlueCastle, plateau);
    instantiateWarriorsGUIRed(RedCastle, plateau);
}




document.addEventListener('DOMContentLoaded', function () {
    showPopup();
});