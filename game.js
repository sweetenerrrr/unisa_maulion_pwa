let words = [
    "fast", "typing", "challenge", "speed", "keyboard", "accuracy", "streak", 
    "performance", "focus", "rhythm", "motion", "progress", "efficiency", "reaction",
    "letters", "words", "type", "skill", "practice", "mastery", "flow", "dexterity",
    "perception", "concentration", "agility", "quickness", "precision", "record",
    "improvement", "language", "sentence", "paragraph", "consistency", "optimization",
    "reflex", "cognition", "competence", "fluency", "momentum", "speedrun"
];

let currentWord = "";
let score = 0;
let streak = 0;
let timeLeft = 60;
let timer;
let gameActive = false; 

const wordDisplay = document.getElementById("word-display");
const wordInput = document.getElementById("word-input");
const timeElement = document.getElementById("time");
const pointsElement = document.getElementById("points");
const streakElement = document.getElementById("streak-count");
const timerBar = document.getElementById("timer-bar");
const restartButton = document.getElementById("restart");
const startGameButton = document.getElementById("start-game"); 
const messageDisplay = document.createElement("p");

messageDisplay.id = "game-message";
messageDisplay.style.color = "#FF5733"; 
messageDisplay.style.fontWeight = "bold";
messageDisplay.style.display = "none"; 
document.body.appendChild(messageDisplay); 

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function startGame() {
    score = 0;
    streak = 0;
    timeLeft = 60;
    gameActive = true;
    
    messageDisplay.style.display = "none"; 
    messageDisplay.style.position = "relative"; 
    messageDisplay.style.marginTop = "10px"; 

    pointsElement.textContent = score;
    streakElement.textContent = streak;
    wordInput.value = "";
    wordInput.focus();
    timerBar.style.width = "100%";  
    nextWord();
    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timeElement.textContent = timeLeft;
            timerBar.style.width = (timeLeft / 60) * 100 + "%";  
        } else {
            clearInterval(timer);
            gameActive = false;
            alert(`Game Over! Final Score: ${score}`);
        }
    }, 1000);
}


function nextWord() {
    if (!gameActive) return; 

    currentWord = getRandomWord();
    wordDisplay.style.opacity = "0";  
    setTimeout(() => {
        wordDisplay.textContent = currentWord;
        wordDisplay.style.opacity = "1";  
    }, 300);
}

wordInput.addEventListener("input", () => {
    if (!gameActive) return;

    if (wordInput.value.trim() === currentWord) {
        score += 10;
        streak++;
        if (streak % 3 === 0) score += 5; 
        pointsElement.textContent = score;
        streakElement.textContent = streak;
        wordInput.value = "";
        nextWord();
    }
});

restartButton.addEventListener("click", () => {
    startGame();
});

startGameButton.addEventListener("click", () => {
    startGame();
    startGameButton.style.display = "none"; 
});
