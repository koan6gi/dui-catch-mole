const startButton = document.getElementById('start-game');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const holes = document.querySelectorAll('.hole');
let score = 0;
let activeMoleIndex = -1;
let gameInterval;
let moleInterval;
let countdownInterval;
let gameTime = 20; // Время игры в секундах
let gameActive = false;

// Функция для начала игры
function startGame() {
    if (gameActive) return;  // Если игра уже идет, ничего не делаем

    gameActive = true;
    score = 0;
    scoreDisplay.textContent = 'Очки: 0';
    gameTime = 20;
    timerDisplay.textContent = `Время: ${gameTime}`;

    // Скрываем всех кротов
    hideMole();

    // Начинаем игру
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

    // Интервал для появления кротов
    moleInterval = setInterval(showMole, 1000);

    // Обратный отсчет времени
    countdownInterval = setInterval(() => {
        if (gameTime > 0) {
            gameTime--;
            timerDisplay.textContent = `Время: ${gameTime}`;
        }
    }, 1000);
}

// Функция для появления крота в случайной ячейке
function showMole() {
    hideMole(); // Скрываем крота из предыдущей ячейки

    const randomIndex = Math.floor(Math.random() * holes.length);
    holes[randomIndex].classList.add('mole');
    activeMoleIndex = randomIndex;

    // Вставляем SVG крота в выбранную ячейку
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

    // Применяем изменение фона через небольшой таймаут
    setTimeout(() => {
        holes[randomIndex].style.backgroundColor = "orange"; // Устанавливаем оранжевый фон
    }, 10);

    // Убираем крота через 0.8 секунды
    setTimeout(() => hideMole(), 800);
}

// Функция для скрытия крота
function hideMole() {
    if (activeMoleIndex >= 0) {
        holes[activeMoleIndex].classList.remove('mole');
        holes[activeMoleIndex].innerHTML = ''; // Убираем SVG крота
        holes[activeMoleIndex].style.backgroundColor = "#555555"; // Возвращаем исходный фон
    }
}

// Обработчик кликов по ячейке
holes.forEach((hole, index) => {
    hole.addEventListener('click', () => {
        if (hole.classList.contains('mole')) {
            score++;
            scoreDisplay.textContent = `Очки: ${score}`;
            hole.classList.remove('mole');
            hole.innerHTML = ''; // Убираем SVG крота
            hole.style.backgroundColor = "#555555"; // Возвращаем исходный фон
        }
    });
});

// Запуск игры по нажатию кнопки
startButton.addEventListener('click', startGame);
