let multiplier = 1.00;
let crashPoint = 0;
let gameInterval;
let isFlying = false;
let score = 0;

const plane = document.getElementById("plane");
const multiplierText = document.getElementById("multiplier");
const statusText = document.getElementById("statusText");
const scoreText = document.getElementById("scoreText");
const startBtn = document.getElementById("startBtn");
const cashOutBtn = document.getElementById("cashOutBtn");

startBtn.addEventListener("click", startGame);
cashOutBtn.addEventListener("click", cashOut);

function startGame() {
    multiplier = 1.00;
    crashPoint = (Math.random() * 3 + 1).toFixed(2); // Random crash 1.00x - 4.00x
    isFlying = true;
    statusText.innerHTML = "Flying... ✈️";
    startBtn.disabled = true;
    cashOutBtn.disabled = false;
    plane.style.left = "-80px";

    gameInterval = setInterval(() => {
        if (!isFlying) return;

        multiplier += 0.03;
        multiplierText.innerHTML = multiplier.toFixed(2) + "x";

        let move = (multiplier * 50);
        plane.style.transform = `translateX(${move}px)`;

        if (multiplier >= crashPoint) {
            crash();
        }
    }, 100);
}

function cashOut() {
    if (isFlying) {
        score += Math.floor(multiplier * 10);
        scoreText.innerHTML = "Score: " + score;
        statusText.innerHTML = "You Cashed Out! 😎";
        stopGame();
    }
}

function crash() {
    statusText.innerHTML = "CRASHED! 💥";
    scoreText.innerHTML = "Score: " + score;
    plane.style.transform = "rotate(90deg)";
    stopGame();
}

function stopGame() {
    isFlying = false;
    clearInterval(gameInterval);
    startBtn.disabled = false;
    cashOutBtn.disabled = true;
}
