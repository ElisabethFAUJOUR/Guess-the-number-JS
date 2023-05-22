
/*On déclare la fonction "generateRandomNumber" pour générer un nombre aléatoire avec les paramètres min et max*/
function generateRandomNumber(min, max) {
    const mathRandomNumber = Math.floor(Math.random() * (max - min + 1) + min); /*On déclare la variable "mathRandomNumber" qui contient le calcul du nombre aléatoire entre min et max*/
    return mathRandomNumber; /*La fonction renvoi la variable "mathRandomNumber" = nombre généré aléatoirement.*/
}

/*On déclare la fonction play qui regroupe les instructions du jeu "juste prix"*/
function play() {
    const game = { /*On déclare les variables regroupées dans l'objet "game" => randomNumber et guessCount*/
        randomNumber: generateRandomNumber(minNumber, maxNumber), /*On apelle la fonction generateRandomNumber avec les attributs minNumber et maxNumber que l'on déclare avant d'executer la fonction play */
        guessCount: 0 /*On déclare la variable guessCount qui correspond au nombre de tours, puis on l'initialise à 0 tour.*/
    };

    let userGuess = Number(prompt("Devinez le nombre entre 0 et 100:")); /*On déclare la variable userGuess qui va demander à l'utilisateur de rentrer un nombre entre 0 et 100*/

    while (userGuess !== game.randomNumber) { /*BOUCLE TANT QUE le nombre saisi userGuess par l'utilisateur est différent du nombre aléatoire game.randomNumber*/
        if (userGuess < game.randomNumber) {
            game.guessCount++;
            alert("Le nombre est trop petit!");
        }
        else if (userGuess > game.randomNumber) {
            game.guessCount++;
            alert("Le nombre est trop grand!");
        }
        userGuess = Number(prompt("Devinez le nombre entre 0 et 100:"));
    }

    alert(`C'est gagné! Tu as trouvé en + ${game.guessCount} essais.`);

    /*On enreguistre le score guessCount dans un tableau et il s'affiche avec une alert*/
    score.push(game.guessCount); 
    alert(`Scores : ${score.join(', ')} essais.`);
   
    /*Demander si l'utilisateur veut rejouer, il doit confirmer ok ou annuler*/
    const playAgain = confirm("Voulez-vous rejouer ?"); 

    if (playAgain) {
        play();   
    } else {
        console.log(`Scores : ${scoreContent}`);
    }
}

/*On déclare les variables minNumber et maxNumber => attributs de la fonction generateRandomNumber.*/
const minNumber = 0;
const maxNumber = 100;

/*Déclaration du tableau pour repertorier le numero de la partie et le nombre d'essais à chaque partie*/
const score = [];

/*On execute la fonction play une premère fois.*/
play()



