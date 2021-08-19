// domElement
const submitForm = document.querySelector('input.btn-submit');
const modalbg = document.querySelector('.bground');
const boxValidation = document.querySelector('.bground-confirmation');

// inputTextListened
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const eMail = document.getElementById('email');
const birthDate = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');

// regExp
const regExpName = /^([A-Za-zéèêëîïç]{2,15})([-\s]?)([A-Za-zéèêëîïç]{0,15})$/;
const regExpMail = /^([A-Za-z0-9\-.]+)@([A-Za-z0-9-]+)\.([a-z]{2,3})$/;
const regExpDate = /^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/;
const regExpNumber = /^[1-6]{1}$/;

// errorMessage
const errorMessageFirstName = 'Veuillez renseigner votre prénom (2 lettres minimum).';
const errorMessageLastName = 'Veuillez renseigner votre nom (2 lettres minimum).';
const errorMessageMail = 'Merci de saisir un adresse E-mail valide.';
const errorMessageBirthDate = 'Veuillez saisir votre date de naissance.';
const errorMessageQuantity = 'Il y a eu 6 évenements par le passé. Choisir entre 1 et 6.';

// ************************ Other *************************

// openResponsiveMenu
/**
 * @name IDontReallyExist
 * @function 
 * Gère l'affichage et le déploiement du menu responsive au click sur l'icône 
 * (visible à 768px max).
 */
(() => {
  const btnMenu = document.querySelector('a.icon');
  const navigation = document.getElementById('myTopnav');
  btnMenu.addEventListener('click', () => {
    if (navigation.className === 'topnav') {
      navigation.className += ' responsive';
    } else {
      navigation.className = 'topnav';
    }
  });
})();

// ************************ Modal *************************

// ==========================
// = Fonctions  Anonymes Auto-invoquées

// openForm
/**
 * @name IDontReallyExist
 * @function 
 * - Ouvre le formulaire au click sur le boutton 'je M'inscris'.
 * - Efface les données stockées en localStorage.
 * - Remonte la page afin de voir le logo au dessus du formulaire.
 */
(() => {
  const modalBtn = document.querySelectorAll('.modal-btn');
  modalBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      modalbg.style.display = 'block';
      localStorage.clear();
      window.scrollTo(0,0);
    });
  });
})();

// closeForm
/**
 * @name IDontReallyExist
 * @function 
 * Ferme le formulaire au click sur (x).
 */
(() => {
  const modalCloseBtn = document.querySelector('span.close');
  modalCloseBtn.addEventListener('click', () => modalbg.style.display = 'none');
})();

// disableSubmit
/**
 * @name IDontReallyExist
 * @function
 * Annule le comportement par défaut de la soumission du formulaire.
 */
(() => submitForm.addEventListener('click', (e) => e.preventDefault()))();

// = Fonctions Anonymes Auto-invoquées - End
// ==========================

/**
 * @name selectParent
 * @function
 * Retourne l'élément parent de l'objet Element passé en argument.
 * @param {object} childrenId - Elément dont on cible le parent.
 * @return {object} Elément parent de l'objet Element passé en argument.
 */
const selectParent = (childrenId) => {
  switch (childrenId) {
    case firstName:
      return document.querySelector('.formData#firstName');
    case lastName:
      return document.querySelector('.formData#lastName');
    case eMail:
      return document.querySelector('.formData#eMail');
    case birthDate:
      return document.querySelector('.formData#birthDate');
    case quantity:
      return document.querySelector('.formData#numberOfTournament');
  }
};

/**
 * @name changeFocusTextValidity
 * @function
 * - Contrôle la conformité de la saisie utilisateur au changement de focus pour 
 *   les champs de type 'text' (prénom, nom, e-mail, date de naissane, nombre de 
 *   participations).
 * - Injecte un message d'erreur à l'élément parent du champ contrôlé si non
 *   conforme a l'expression régulière assigné.
 * - Injecte un attribut de validation si ok.
 * @param  {object} inputListened - Elément de type 'input' contrôlé.
 * @param  {regExp} regExp - Expression régulière assignée au champ contrôlé.
 * @param  {string} errorMessage - Message d'erreur injecté à l'élément parent du
 * champ contrôlé si non conforme.
 */
const changeFocusTextValidity = (inputListened, regExp, errorMessage) => {
  inputListened.addEventListener('focusout', (e) => {
    const validate = regExp.test(e.target.value);
    if (validate) {
      selectParent(inputListened).setAttribute('data-error-visible', 'false');
      selectParent(inputListened).setAttribute('data-error', '');
    } else {
      selectParent(inputListened).setAttribute('data-error-visible', 'true');
      selectParent(inputListened).setAttribute('data-error', errorMessage);
    }
  });
};

/**
 * @name submitTextValidity
 * @function 
 * - Contrôle si les champs de type 'text' (prénom, nom, e-mail, date de 
 *   naissane, nombre de participations) sont vides à la soumission du 
 *   formulaire.  
 * - Injecte un message d'erreur à l'élément parent du champ contrôlé si vide.
 * - Stocke les données saisies en localStorage si non vide.
 * @param  {object} inputListened - Elément de type 'input' contrôlé.
 * @param  {string} errorMessage - Message d'erreur injecté à l'élément parent du
 * champ contrôlé si vide.
 * @param  {string} keyName - Nom de la clé pour le stockage de la donnée en 
 * localStorage.
 */
const submitTextValidity = (inputListened, errorMessage, keyName) => {
  submitForm.addEventListener('click', () => {
    if (inputListened.value == '') {
      selectParent(inputListened).setAttribute('data-error-visible', 'true');
      selectParent(inputListened).setAttribute('data-error', errorMessage);
    } else {
      let data = inputListened.value;
      localStorage.setItem(keyName, data);
    }
  });
};

/**
 * @name checkCitySelect
 * @function 
 * - Vérifie à la soumission du formulaire, si l'un des bouttons radio a été 
 *   sélectionné.
 * - Injecte un message d'erreur si aucune ville n'a été choisie.
 * - Injecte un attribut de validation si ok.
 * - Stocke la ville sélectionnée en localStorage sous le clé 'city'.
 */
const checkCitySelect = () => {
  const inputsListened = document.querySelectorAll('.checkbox-input[name="location"]');
  const whereToSetErrorData = document.querySelector('.formData#city');
  const whereToSetErrorMessage = document.querySelector('div#city.formData .error-message');
  submitForm.addEventListener('click', () => {
    // Boucle de vérification des bouttons 'radio'.
    for (let item of inputsListened) {
      if (item.checked) {
        whereToSetErrorMessage.innerHTML = '';
        whereToSetErrorData.setAttribute('data-error-visible', 'false');
        localStorage.setItem('city', item.value);
        // Sortie de boucle dès qu'une ville est vérifiée 'checked'.
        break;
      } else {
        whereToSetErrorMessage.innerHTML = '<p>Merci de sélectionner une ville.</p>';
        whereToSetErrorData.setAttribute('data-error-visible', 'true');
      }
    }
  });
};

/**
 * @name termOfUse
 * @function 
 * - Contrôle à la soumission du formulaire, si les conditions d'utilisations ont
 *   été acceptées.
 * - Injecte un message d'erreur si la checkbox n'est pas cochée.
 * - Injecte un attribut de validation si ok.
 */
const termOfUse = () => {
  const inputListened = document.getElementById('checkbox1');
  const whereToSetErrorData = document.querySelector('.formData#tOU');
  const whereToSetErrorMessage = document.querySelector('div.formData#tOU .error-message');
  submitForm.addEventListener('click', () => {
    if (inputListened.checked == false) {
      whereToSetErrorMessage.innerHTML = '<p>Vous devez accepter les termes et conditions.</p>';
      whereToSetErrorData.setAttribute('data-error-visible', 'true');
    } else if (inputListened.checked) {
      whereToSetErrorMessage.innerHTML = '';
      whereToSetErrorData.setAttribute('data-error-visible', 'false');
    }
  });
};

/**
 * @name newsLetter
 * @function 
 * - Stock un booléen sous la clé 'newsLetter' en localStorage.
 * - 'true' si l'utilisateur souhaite être informé des futurs évenements.
 * - 'false' si non.
 */
const newsLetter = () => {
  const inputListened = document.getElementById('checkbox2');
  submitForm.addEventListener('click', () => localStorage.setItem('newsLetter', inputListened.checked));
};

/**
 * @name closeBookingConfirmation
 * @function 
 * - Ferme la fenêtre de confirmation au click sur 'ok'.
 * - Recharge la page.
 */
const closeBookingConfirmation = () => {
  const btnValidation = document.querySelector('.bground-confirmation button');
  btnValidation.addEventListener('click', () => {
    boxValidation.style.display = 'none';
    window.location.reload();
  });
};

/**
 * @name bookingConfirmation
 * @function
 * Ouvre une fenêtre de confirmation de réservation personnalisée.
 */
const bookingConfirmation = () => {
  const user = localStorage.getItem('firstName');
  const whereTextValidation = document.getElementById('confirmation');
  boxValidation.style.display = 'block';
  whereTextValidation.innerHTML = `<p>Cher(e) ${user},<br>Votre inscription a bien été prise en compte.</p>
  <button class="btn-submit button">Ok</button>`;
  closeBookingConfirmation();
};

/**
 * @name goodAnswer
 * @function
 * Compte le nombre d'entrées valides saisies par l'utilisateur.
 * @return  {number} retourne le nombre d'entrées valides saisies par l'utilisateur.
 */
const goodAnswer = () => {
  const allEntry = document.querySelectorAll('.formData[data-error-visible="false"]');
  let i = 0;
  allEntry.forEach(() => i += 1);
  return i;
};

/**
 * @name validationAndConfirmation
 * @function
 * - Ferme le formulaire si toutes les entrées sont correct.
 * - Affiche la confirmation de réservation.
 */
const validationAndConfirmation = () => {
  submitForm.addEventListener('click', () => {
    if (goodAnswer() === 7) {
      modalbg.style.display = 'none';
      bookingConfirmation();
    }
  });
};

// ********************************************************

changeFocusTextValidity(firstName, regExpName, errorMessageFirstName);
changeFocusTextValidity(lastName, regExpName, errorMessageLastName);
changeFocusTextValidity(eMail, regExpMail, errorMessageMail);
changeFocusTextValidity(birthDate, regExpDate, errorMessageBirthDate);
changeFocusTextValidity(quantity, regExpNumber, errorMessageQuantity);

submitTextValidity(firstName, errorMessageFirstName, 'firstName');
submitTextValidity(lastName, errorMessageLastName, 'lastName');
submitTextValidity(eMail, errorMessageMail, 'eMail');
submitTextValidity(birthDate, errorMessageBirthDate, 'birthDate');
submitTextValidity(quantity, errorMessageQuantity, 'quantity');

checkCitySelect();
termOfUse();
newsLetter();

validationAndConfirmation();

// *********************** Back-end ***********************

// dataForBackEnd
const userData = {
  firstName: localStorage.getItem('firstName'),
  lastName: localStorage.getItem('lastName'),
  eMail: localStorage.getItem('eMail'),
  birthDate: localStorage.getItem('birthDate'),
  quantity: localStorage.getItem('quantity'),
  city: localStorage.getItem('city'),
  newsLetter: localStorage.getItem('newsLetter')
};

// displayUserData
(() => {
  for (let property in userData) {
    console.log(`${property}: ${userData[property]}`);
  }
})();

// ************************* End **************************
