// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');

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

// openForm
/**
 * @name IDontReallyExist
 * @function 
 * - Ouvre le formulaire au click sur le boutton 'je M'inscris'.
 * - Efface les données stockées en localStorage.
 */
 (() => {
  modalBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      modalbg.style.display = 'block';
      localStorage.clear();
    })
  })
})();