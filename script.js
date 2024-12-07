const startButton = document.getElementById('start-game');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const holes = document.querySelectorAll('.hole');
let score = 0;
let activeMoleIndex = -1;
let gameInterval;
let moleInterval;
let countdownInterval;
let gameTime = 20; 
let gameActive = false;

function startGame() {
    if (gameActive) return;  

    gameActive = true;
    score = 0;
    scoreDisplay.textContent = 'Очки: 0';
    gameTime = 20;
    timerDisplay.textContent = `Время: ${gameTime}`;

    hideMole();

    gameInterval = setInterval(() => {
        if (gameTime <= 0) {
            clearInterval(moleInterval);
            clearInterval(gameInterval);
            clearInterval(countdownInterval);
            alert('Время вышло! Игра завершена.');
            gameActive = false;
            return;
        }
    }, 1000);

    moleInterval = setInterval(showMole, 1000);

    countdownInterval = setInterval(() => {
        if (gameTime > 0) {
            gameTime--;
            timerDisplay.textContent = `Время: ${gameTime}`;
        }
    }, 1000);
}

function showMole() {
    hideMole(); 

    const randomIndex = Math.floor(Math.random() * holes.length);
    holes[randomIndex].classList.add('mole');
    activeMoleIndex = randomIndex;

    holes[randomIndex].innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 100 100">
            <!-- Тело крота -->
            <circle cx="50" cy="50" r="30" fill="gray" />
            <!-- Глаза крота -->
            <circle cx="40" cy="40" r="5" fill="white" />
            <circle cx="60" cy="40" r="5" fill="white" />
            <!-- Нос крота -->
            <circle cx="50" cy="55" r="4" fill="pink" />
            <!-- Уши крота -->
            <ellipse cx="30" cy="30" rx="6" ry="10" fill="gray" />
            <ellipse cx="70" cy="30" rx="6" ry="10" fill="gray" />
            <!-- Рот крота -->
            <path d="M 40 60 Q 50 70, 60 60" stroke="black" stroke-width="2" fill="transparent" />
            <!-- Лапки крота -->
            <circle cx="40" cy="70" r="5" fill="gray" />
            <circle cx="60" cy="70" r="5" fill="gray" />
        </svg>
    `;

    setTimeout(() => {
        holes[randomIndex].style.backgroundColor = "orange"; 
    }, 10);

    setTimeout(() => hideMole(), 800);
}

function hideMole() {
    if (activeMoleIndex >= 0) {
        holes[activeMoleIndex].classList.remove('mole');
        holes[activeMoleIndex].innerHTML = '';
        holes[activeMoleIndex].style.backgroundColor = "#555555"; 
    }
}

holes.forEach((hole, index) => {
    hole.addEventListener('click', () => {
        if (hole.classList.contains('mole')) {
            score++;
            scoreDisplay.textContent = `Очки: ${score}`;
            hole.classList.remove('mole');
            hole.innerHTML = ''; 
            hole.style.backgroundColor = "#555555"; 
        }
    });
});

startButton.addEventListener('click', startGame);
