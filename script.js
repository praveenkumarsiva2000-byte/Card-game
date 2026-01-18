// Card symbols (pairs)
const symbols = ["🍎", "🍌", "🍇", "🍉", "🍒", "🥝"];

// Duplicate cards
let cardsArray = [...symbols, ...symbols];

// Game state
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Timer, moves, score
let time = 0;
let moves = 0;
let score = 0;
let timerInterval;

// DOM elements
const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");
const timerEl = document.getElementById("timer");
const movesEl = document.getElementById("moves");
const scoreEl = document.getElementById("score");

// Shuffle cards
function shuffleCards() {
  cardsArray.sort(() => Math.random() - 0.5);
}

// Start timer
function startTimer() {
  clearInterval(timerInterval);
  time = 0;
  timerEl.textContent = time;

  timerInterval = setInterval(() => {
    time++;
    timerEl.textContent = time;
  }, 1000);
}

// Create game board
function createBoard() {
  gameBoard.innerHTML = "";
  shuffleCards();

  // Reset game state
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  // Reset stats
  moves = 0;
  score = 0;
  movesEl.textContent = moves;
  scoreEl.textContent = score;

  startTimer();

  cardsArray.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${symbol}</div>
      </div>
    `;

    card.dataset.symbol = symbol;
    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
  });
}

// Flip card
function flipCard(card) {
  if (lockBoard || card === firstCard || card.classList.contains("matched")) return;

  card.classList.add("flip");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  moves++;
  movesEl.textContent = moves;

  checkForMatch();
}

// Match check
function checkForMatch() {
  lockBoard = true;

  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    score += 10;
    scoreEl.textContent = score;

    resetTurn();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetTurn();
    }, 800);
  }
}

// Reset turn
function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

// Restart game
restartBtn.addEventListener("click", createBoard);

// Init
createBoard();
