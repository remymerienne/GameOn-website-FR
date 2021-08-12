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
  })
})();

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


