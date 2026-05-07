let user = null;

let stats = {
    correct: 0,
    wrong: 0,
    difficulty: "Easy"
};

let currentAnswer = 0;

function show(id){
    document.querySelectorAll(".screen").forEach(screen=>{
        screen.classList.add("hidden");
    });

    document.getElementById(id).classList.remove("hidden");

    if(id === "progress"){
        updateProgress();
    }
}

function goTerms(event){
    event.preventDefault();
    show("terms");
}

function signup(){

    const agree = document.getElementById("agree");

    if(!agree.checked){
        alert("Please agree to the Terms & Conditions");
        return;
    }

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    localStorage.setItem("user",JSON.stringify({
        name,
        email,
        pass
    }));

    alert("Account Created!");
    show("signin");
}

function login(event){

    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPass").value;

    const saved = JSON.parse(localStorage.getItem("user"));

    if(saved && saved.email === email && saved.pass === pass){

        user = saved;

        document.getElementById("userName").textContent =
        saved.name;

        show("dashboard");

    }else{
        alert("Invalid Login");
    }
}

function adjustDifficulty(){

    let total = stats.correct + stats.wrong;

    let accuracy = total > 0
    ? (stats.correct / total) * 100
    : 0;

    if(accuracy >= 80){
        stats.difficulty = "Hard";
    }
    else if(accuracy >= 50){
        stats.difficulty = "Medium";
    }
    else{
        stats.difficulty = "Easy";
    }

    document.getElementById("difficulty").textContent =
    stats.difficulty;
}

function startGame(){

    show("game");

    let a,b;

    if(stats.difficulty === "Easy"){
        a = Math.floor(Math.random()*10);
        b = Math.floor(Math.random()*10);
    }
    else if(stats.difficulty === "Medium"){
        a = Math.floor(Math.random()*20);
        b = Math.floor(Math.random()*20);
    }
    else{
        a = Math.floor(Math.random()*50);
        b = Math.floor(Math.random()*50);
    }

    currentAnswer = a + b;

    document.getElementById("question").textContent =
    `${a} + ${b}`;

    document.getElementById("answer").value = "";

    setTimeout(()=>{
        document.getElementById("answer").focus();
    },100);
}

function submitAnswer(event){

    event.preventDefault();

    const answer =
    parseInt(document.getElementById("answer").value);

    if(answer === currentAnswer){

        stats.correct++;

        document.getElementById("resultText").textContent =
        "✅ Correct!";

    }else{

        stats.wrong++;

        document.getElementById("resultText").textContent =
        "❌ Wrong!";
    }

    adjustDifficulty();

    show("result");
}

function updateProgress(){

    document.getElementById("correctScore").textContent =
    stats.correct;

    document.getElementById("wrongScore").textContent =
    stats.wrong;

    let total = stats.correct + stats.wrong;

    let accuracy = total > 0
    ? Math.round((stats.correct / total) * 100)
    : 0;

    document.getElementById("accuracyScore").textContent =
    accuracy + "%";
}