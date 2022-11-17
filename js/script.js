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

const IDclavier = document.getElementById("clavier");
const IDmot = document.getElementById("mot");
const IDProposition = document.getElementById("proposition");
const IDBtn_valid = document.getElementById("btn-valid");

console.log(IDBtn_valid);

let mot = "Information".toLowerCase();
let motCache = Array();
console.log(motCache);
let lettreClicked;

// *******************************
//           Fonctions
// *******************************

function initialise() {
    for (const {} of mot) motCache.push("_");
    console.log(motCache);
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
            verifierLettre(element);
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
        $(element).css("background-color", "green");
    } else {
        $(element).css("background-color", "red");
    }
    console.log(motCache.join(""));
    verifierMot(motCache.join(""));
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
    console.log(motAVerifier);
    if (motAVerifier == mot) {
        console.log("VICTOIRE !!");
    }
}

// *******************************
//           Evenements
// *******************************

IDBtn_valid.addEventListener("click", (e) => {
    e.preventDefault();
    let proposition = IDProposition.value.toLowerCase();
    verifierMot(proposition);
});

// *******************************
//           Jeu
// *******************************

initialise();
afficherClavier();
afficherTiret();
