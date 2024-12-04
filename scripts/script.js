let send = document.getElementById("sendbtn");
let cancel = document.getElementById("cancelbtn");

// Les input et bouton

let nom = document.getElementById("nom");
let prenom = document.getElementById("prenom");
let date = document.getElementById("date");
let email = document.getElementById("email");
let code = document.getElementById("code");

// Article qui vont contenir les messages et obligations
let onom = document.getElementById("OLigne1");
let oprenom = document.getElementById("OLigne2");
let odate = document.getElementById("OLigne3");
let oemail = document.getElementById("OLigne4");
let ocode = document.getElementById("OLigne5");

let form = document.getElementById("formb");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

form.addEventListener("change", () => {
  verifname(nom.value);
  veriffirstname(prenom.value);
  validateddate(date.value);
  verifemail(email.value);
  verifconfidentialcode(code.value);
});

// Fonction qui retourne la valeur donnée avec le premier caractère en majuscule
function capitalizeFirstLetter(val) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

// Fonction qui verifie la validité du nom de famille et qui retourne tout le nom en majuscule
function verifname(_nom) {
  if (_nom.length >= 3) {
    nom.innerText = _nom.toUpperCase();
  } else {
    console.log("nom inccorecte");
  }
}

// Fonction qui verifie la validité du prénom et renvoie le prénom avec le premier caractère en majuscule
function veriffirstname(_prenom) {
  if (_prenom.length >= 3) {
    return capitalizeFirstLetter(_prenom);
  } else {
    console.log("Prenom invalide");
  }
}

// Fonction qui verifie la validité du format de la date de naissance
function validateddate(_date) {
  // Expression regulière qui permet de tester la validité du format de la date
  let date_vailde =
    /^([0-2][1-9]|[3][0-1])\/([0][1-9]|[1][0-2])\/([1][(9)][0-9][0-9]|[2][0]([0-1][0-9]|[2][0-4]))/;

  if (date_vailde.test(_date) == true) {
    console.log("date valide !");
  } else {
    console.log("date invalide !");
  }
}

// Fonction qui verifie la validité de l'email
function verifemail(mail) {
  let e = mail;
  let email = /^[a-z0-9]*\.?[a-z0-9]*?[@][a-z]*\.[a-z]*/;
  if (email.test(e) == true) {
    console.log("Email valide !");
  } else {
    console.log("Email non valide !");
  }
}

// Fonction qui verifie la validité du code confidentiel
function verifconfidentialcode(_code) {
  let code_valide = /^[F][R][0-9]{5}([A-Z]|[-]|[.]|[_]){3}[x]$/;

  if (code_valide.test(_code) == true) {
    console.log("Code valide !");
  } else {
    console.log("Code invalide !");
  }
}
