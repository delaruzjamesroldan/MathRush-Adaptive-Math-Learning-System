let user = null;

let stats = {
    correct: 0,
    wrong: 0,
    streak: 0,
    difficulty: "easy"
};

function show(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

function signup() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    if (!name || !email || !pass) {
        alert("Fill all fields");
        return;
    }

    localStorage.setItem("user", JSON.stringify({name, email, pass}));
    alert("Account created!");
    show("signin");
}

function login() {
    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPass").value;

    const saved = JSON.parse(localStorage.getItem("user"));

    if (saved && saved.email === email && saved.pass === pass) {
        user = saved;
        document.getElementById("userName").textContent = user.name;
        show("dashboard");
    } else {
        alert("Invalid login");
    }
}

function adjustDifficulty() {
    let total = stats.correct + stats.wrong;
    let acc = total > 0 ? (stats.correct / total) * 100 : 0;

    if (acc >= 80 && stats.streak >= 3) {
        stats.difficulty = "hard";
    } else if (acc >= 50) {
        stats.difficulty = "medium";
    } else {
        stats.difficulty = "easy";
    }

    const el = document.getElementById("difficulty");
    if (el) el.textContent = stats.difficulty;
}

let currentAnswer = 0;

function startGame() {
    show("game");

    let a, b;

    if (stats.difficulty === "easy") {
        a = Math.floor(Math.random()*10);
        b = Math.floor(Math.random()*10);
    } else if (stats.difficulty === "medium") {
        a = Math.floor(Math.random()*20);
        b = Math.floor(Math.random()*20);
    } else {
        a = Math.floor(Math.random()*50);
        b = Math.floor(Math.random()*50);
    }

    currentAnswer = a + b;
    document.getElementById("question").textContent = `${a} + ${b}`;
}

function submitAnswer() {
    const val = parseInt(document.getElementById("answer").value);

    if (val === currentAnswer) {
        stats.correct++;
        stats.streak++;
        document.getElementById("resultText").textContent = "Correct!";
    } else {
        stats.wrong++;
        stats.streak = 0;
        document.getElementById("resultText").textContent = "Wrong!";
    }

    adjustDifficulty();

    document.getElementById("streak").textContent = stats.streak;

    show("result");
}