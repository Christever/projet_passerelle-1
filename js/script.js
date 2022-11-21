const clavier = [
    "a",
    "z",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "q",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "m",
    "w",
    "x",
    "c",
    "v",
    "b",
    "n",
];

// *******************************
//           Evennements
// *******************************

// *******************************
//           Variables
// *******************************

const IDclavier = document.getElementById("clavier");
const IDmot = document.getElementById("mot");
const IDProposition = document.getElementById("proposition");
const IDBtn_valid = document.getElementById("btn-valid");
const IDDessin = document.getElementById("dessin");
const IDText_game = document.getElementById("text-game");
const IDFormulaire = document.getElementById("formulaire");
const IDEnd_game = document.getElementById("end-game");

const maxCoups = 8;

const url = "../data/mots.json";

// let mot = "Test".toLowerCase();
let mot;
let motCache = Array();
let lettreClicked;

let donnees;
let nbCoups = 0;
let numeroImg = 1;

// *******************************
//           Fonctions
// *******************************

async function motAleatoire() {
    const requete = await fetch(url, {
        method: "GET",
    });

    if (!requete.ok) {
        alert("Un problème est survenu");
    } else {
        donnees = await requete.json();

        mot =
            donnees[
                Math.floor(Math.random() * donnees.length)
            ].MOT.toLowerCase();

        console.log(mot);
        initialise();
        afficherClavier();
        afficherTiret();
    }
}

function initialise() {
    for (const {} of mot) motCache.push("_");

    IDBtn_valid.addEventListener("click", (e) => {
        e.preventDefault();
        let proposition = IDProposition.value.toLowerCase();
        nbCoups++;
        if (proposition === mot) {
            victoire();
        } else {
            $(IDProposition).val("");

            console.log(nbCoups);
            dessinePendu();
        }
    });
    $(IDEnd_game).css("display", "none");
    $(IDFormulaire).css("display", "");
}

function afficherClavier() {
    clavier.forEach((element) => {
        let key = document.createElement("div");
        key.textContent = element;
        key.className = "key";
        IDclavier.appendChild(key);
    });

    const key = document.querySelectorAll(".key");

    key.forEach((element) => {
        element.addEventListener("click", (e) => {
            lettreClicked = element.innerHTML;
            $(element).removeClass("key");
            $(element).addClass("clicked");
            nbCoups++;
            verifierLettre(element);
            console.log(nbCoups);
        });
    });
}

function verifierLettre(element) {
    let lettreOK = false;
    for (let index = 0; index < mot.length; index++) {
        if (lettreClicked === mot[index]) {
            lettreOK = true;
            const l = document.getElementsByClassName(`case${index}`);
            $(l).text(lettreClicked);
            motCache[index] = lettreClicked;
        }
    }
    if (lettreOK) {
        $(element).css("background-color", "var(--color-5)");
    } else {
        $(element).css("background-color", "var(--color-4)");
        dessinePendu();
    }

    if (motCache.join("") === mot) {
        victoire();
    }
}

function afficherTiret() {
    for (let index = 0; index < mot.length; index++) {
        let tiret = document.createElement("div");
        tiret.textContent = "_";
        tiret.className = `tiret case${index}`;
        IDmot.appendChild(tiret);
    }
}

function verifierMot(motAVerifier) {
    if (motAVerifier === mot) {
        victoire();
    } else {
        dessinePendu();
    }
}

function victoire() {
    $(IDmot).text(mot).addClass("motDecouvert");
    $(IDFormulaire).css("display", "none");
    // IDFormulaire.style.display = "none";

    $(IDEnd_game).css("display", "");

    $(IDEnd_game).addClass("flex flex-column justify-arround align-center");
    $(IDEnd_game).css("background-color", "var(--color-5)");

    // IDEnd_game.style.backgroundColor = "green";

    $(IDEnd_game).html(
        `<h2>Vous avez gagné en ${nbCoups} coups</h2> <button class="btn" id="btn-start">Recommencer</button>`
    );
    $(IDEnd_game).css("color", "var(--color-1");

    document.getElementById("btn-start").addEventListener("click", () => {
        location.reload();
    });
}

function defaite() {
    $(IDFormulaire).css("display", "none");
    $(IDEnd_game).css("display", "");
    $(IDEnd_game).addClass("flex flex-column justify-arround align-center");
    $(IDEnd_game).css("background-color", "var(--color-4)");

    $(IDEnd_game).html(
        `<h2>Vous avez perdu</h2><h3>Le mot caché était : ${mot}</h3> <button class="btn" id="btn-start">Recommencer</button>`
    );

    $(IDEnd_game).css("color", "var(--color-1");

    document.getElementById("btn-start").addEventListener("click", () => {
        location.reload();
    });
}

function dessinePendu() {
    $(document).ready(function () {
        numeroImg++;
        let url = "../images/pendu-" + numeroImg + ".png";
        $("img").attr("src", url);
        if (nbCoups == maxCoups) {
            defaite();
        }
    });
}

function start() {
    motAleatoire();
}

// *******************************
//           Jeu
// *******************************

window.onload = () => {
    start();
};
