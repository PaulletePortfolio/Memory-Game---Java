const cards = document.querySelectorAll(".memory-card"); /*seleciona todas as cards */

let hasFlippedCard = false; /*variavel que diz se a carta esta virada ou não(ela esta false pq no inicio do jogo n tem cartas viradas) */
let lockBoard = false; /* bloqeuia as cartas restanteso enquanto as cartas estão sendo viradas*/
let firstCard, secondCard; /* para armazenar as duas cartas que o jogador selecionou para comparação. */


/* virar a carta */
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

/* função de checar o par */
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

/* desvirar a carta se estiver errado o par */

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1200);
}

/*Esta é uma função JavaScript que redefine o estado de um tabuleiro de jogo da memória*/

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

  (function shuffle() {  /*shuffle embaralha */
   cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 17);
     card.style.order = randomPos;
   });
 })();


cards.forEach((card) => card.addEventListener("click", flipCard));

/*BOTÃO RESETAR */

const resetar = document.querySelector('#resetar');

resetar.addEventListener('click', () => {
  location.reload();
});


const checkEndGame = () => {
  setTimeout(() => {
    const disableCards = document.querySelectorAll(".disabled-card");
    if (disableCards.length === 15) {
      alert("Parabens voce ganhou!");
    }
  }, 700);
};
