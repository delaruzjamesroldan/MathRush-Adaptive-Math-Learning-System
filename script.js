// SCREEN NAVIGATION
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

// AUTH
function signIn() {
    const email = document.getElementById("login-email").value;
    if (!email) return alert("Enter email");

    localStorage.setItem("user", email);
    showScreen("dashboard-screen");
}

function goToTerms() {
    showScreen("terms-screen");
}

function acceptTerms() {
    if (!document.getElementById("agree").checked) {
        return alert("Agree first!");
    }
    showScreen("dashboard-screen");
}

// USER DATA
let userStats = {
    correct: 0,
    wrong: 0,
    streak: 0,
    difficulty: "easy"
};

// GAME LOGIC
let currentAnswer;
let questionCount = 0;

function startGame() {
    questionCount = 0;
    showScreen("game-screen");
    loadQuestion();
}

function generateQuestion() {
    let a, b, q, ans;

    if (userStats.difficulty === "easy") {
        a = Math.floor(Math.random() * 10);
        b = Math.floor(Math.random() * 10);
        q = `${a} + ${b}`;
        ans = a + b;
    } else if (userStats.difficulty === "medium") {
        a = Math.floor(Math.random() * 20);
        b = Math.floor(Math.random() * 10);
        q = `${a} - ${b}`;
        ans = a - b;
    } else {
        a = Math.floor(Math.random() * 12);
        b = Math.floor(Math.random() * 12);
        q = `${a} × ${b}`;
        ans = a * b;
    }

    return { q, ans };
}

function loadQuestion() {
    const data = generateQuestion();
    currentAnswer = data.ans;
    document.getElementById("question").textContent = data.q;
}

function submitAnswer() {
    const userAns = parseInt(document.getElementById("answer").value);

    if (userAns === currentAnswer) {
        userStats.correct++;
        userStats.streak++;
    } else {
        userStats.wrong++;
        userStats.streak = 0;
    }

    adjustDifficulty();

    questionCount++;
    document.getElementById("answer").value = "";

    if (questionCount >= 5) {
        showScreen("result-screen");
    } else {
        loadQuestion();
    }
}

// ADAPTIVE SYSTEM
function adjustDifficulty() {
    const total = userStats.correct + userStats.wrong;
    const acc = (userStats.correct / total) * 100;

    if (acc >= 80 && userStats.streak >= 3) {
        userStats.difficulty = "hard";
    } else if (acc >= 50) {
        userStats.difficulty = "medium";
    } else {
        userStats.difficulty = "easy";
    }

    document.getElementById("difficulty").textContent = userStats.difficulty;
}

// LOAD USER
window.onload = () => {
    const user = localStorage.getItem("user");
    if (user) {
        document.getElementById("user-name").textContent = user;
    }
};