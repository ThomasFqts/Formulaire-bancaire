// Les boutons
let send = document.getElementById("sendbtn");
let cancel = document.getElementById("cancelbtn");

// Les input
let nom = document.getElementById("nom");
let prenom = document.getElementById("prenom");
let date = document.getElementById("date");
let email = document.getElementById("email");
let code = document.getElementById("code");

// Article qui vont contenir les messages d'erreur
let onom = document.getElementById("OLigne1");
let oprenom = document.getElementById("OLigne2");
let odate = document.getElementById("OLigne3");
let oemail = document.getElementById("OLigne4");
let ocode = document.getElementById("OLigne5");

let form = document.getElementById("formb");
closebtn = document.getElementById("confirmSubmit");

// Ajout d'un écouteur d'événement pour soumettre le formulaire
closebtn.addEventListener("click", () => {
  form.submit();  // Soumet le formulaire une fois l'utilisateur a confirmé
});

// Écouteur d'événement pour vérifier les champs à chaque changement
form.addEventListener("change", () => {
  // Réinitialisation des messages d'erreur
  onom.innerHTML = `<p></p>`;
  oprenom.innerHTML = `<p></p>`;
  odate.innerHTML = `<p></p>`;
  oemail.innerHTML = `<p></p>`;
  ocode.innerHTML = `<p></p>`;

  // Validation des champs
  verifname(nom.value);
  veriffirstname(prenom.value);
  validateddate(date.value);
  verifemail(email.value);
  verifconfidentialcode(code.value);
});

// Écouteur d'événement pour vérifier que si tous les champs sont correctes, un modal s'ouvre
send.addEventListener("click", (event) => {
  event.preventDefault(); // Empêche la soumission immédiate

  // Variables pour stocker les résultats des validations des champs
  let validNom = verifname(nom.value);
  let validPrenom = veriffirstname(prenom.value);
  let validDate = validateddate(date.value);
  let validEmail = verifemail(email.value);
  let validCode = verifconfidentialcode(code.value);

  // Vérifie si tous les champs sont valides
  if (validNom && validPrenom && validDate && validEmail && validCode) {
    // Ouvre le modal si tout est valide
    let modal = new bootstrap.Modal(document.getElementById("confirmationModal"));
    modal.show();
  } else {
    // Si des erreurs existent, affiche une alert
    alert("Le formulaire contient des erreurs.");
  }
});

// Écouteur d'événement pour réinitialiser les messages d'erreur
cancel.addEventListener("click", () => {
  onom.innerText = "";
  oprenom.innerText = "";
  odate.innerText = "";
  oemail.innerText = "";
  ocode.innerText = "";
});

// Fonction qui retourne la valeur donnée avec le premier caractère en majuscule
function capitalizeFirstLetter(val) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

// Fonction qui verifie la validité du nom de famille et qui retourne tout le nom en majuscule
function verifname(_nom) {
  // Si le nom est trop court, on affiche un message d'erreur
  if (_nom.length < 3) {
    onom.innerHTML = `<p class="champs">Le nom doit contenir au moins 3 caractères.</p>`;
    return false
  } else {
    // Si valide, efface le message d'erreur et met le nom en majuscule
    onom.innerText = "";
    nom.value = _nom.toUpperCase();
    return true
  }
}

// Fonction qui verifie la validité du prénom et renvoie le prénom avec le premier caractère en majuscule
function veriffirstname(_prenom) {
  // Si le prénom est trop court, on affiche un message d'erreur
  if (_prenom.length < 3) {
    oprenom.innerHTML = `<p class="champs">Le prenom doit contenir au moins 3 caractères.</p>`;
    return false
  } else {
    // Si valide, efface le message d'erreur et met la première lettre en majuscule
    oprenom.innerText = "";
    prenom.value = capitalizeFirstLetter(_prenom);
    return true
  }
}

// Fonction qui verifie la validité du format de la date de naissance
function validateddate(_date) {
  // Vérifie si la date est sous le format compact (sans séparateurs)
  if (/^\d{8}$/.test(_date)) {
    // Si la date est sous forme de 12022000, on ajoute les séparateurs '/'
    _date = _date.replace(/^(\d{2})(\d{2})(\d{4})$/, "$1/$2/$3");
  }
  
  // Remplace les séparateurs différents par des '/'
  _date = _date.replace(/[-. ]/g, "/");

  // Expression regulière qui permet de tester la validité du format de la date
  let date_valide = /^([0-2][0-9]|[3][0-1])\/([0][1-9]|[1][0-2])\/([1][9][0-9]{2}|[2][0-9]{3})$/;

  // Si la date n'est pas valide
  if (!date_valide.test(_date)) {
    odate.innerHTML = `<p class="champs">La date de naissance est invalide (jj/mm/aaaa).</p>`;
    return false;
  }

  // Si le format est valide, on découpe la chaîne de date (_date) en jour, mois, et année, en convertissant chaque valeur en nombre
  let [jour, mois, annee] = _date.split("/").map(Number);

  // On vérifie les jours selon le mois
  const joursParMois = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // On fait une vérification des années bissextiles pour février
  if ((annee % 4 === 0 && annee % 100 !== 0) || (annee % 400 === 0)) {
    joursParMois[1] = 29; // Février a 29 jours
  }

  // On vérifie si le jour spécifié dépasse le nombre de jours maximum pour le mois donné
  if (jour > joursParMois[mois - 1]) {
    odate.innerText = "La date est invalide pour le mois spécifié.";
    return false;
  }

  // Si tout est valide
  odate.innerText = ""; // Efface les messages d'erreur
  date.value = _date; // Met à jour le champ avec le bon format
  return true;
}

// Fonction qui verifie la validité de l'email
function verifemail(mail) {
  let e = mail;
  // Expression régulière pour vérifier le format de l'email
  let email = /^[a-z0-9]*\.?[a-z0-9]*?[@][a-z]*\.[a-z]*/;
  if (email.test(e) == true) {
    oemail.innerText = ""; // Efface les messages d'erreur
    return true;
  } else {
    oemail.innerHTML = `<p class="champs">L'adresse email est invalide.</p>`;
    return false;
  }
}

// Fonction qui verifie la validité du code confidentiel
function verifconfidentialcode(_code) {
  // Expression régulière pour vérifier la validité du format du code
  let code_valide = /^[F][R][0-9]{5}([A-Z]|[-]|[.]|[_]){3}[x]$/;

  if (code_valide.test(_code) == true) {
    // Si c'est valide alors on efface les messages d'erreur
    ocode.innerText = "";
    return true;
  } else {
    // Sinon on affiche un message d'erreur
    ocode.innerHTML = `<p class="champs">Le code confidentiel est invalide.</p>`;
    return false;

  }
}