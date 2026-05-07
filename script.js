let user = null;

let stats = {
    correct: 0,
    wrong: 0,
    difficulty: "Easy"
};

let currentAnswer = 0;

// SHOW SCREEN
function show(id){

    document.querySelectorAll(".screen")
    .forEach(screen=>{
        screen.classList.add("hidden");
    });

    document
    .getElementById(id)
    .classList.remove("hidden");

    if(id === "progress"){
        updateProgress();
    }
}

// GO TO TERMS
function goTerms(event){

    event.preventDefault();

    show("terms");
}

// SIGNUP
function signup(){

    const agree =
    document.getElementById("agree");

    if(!agree.checked){

        alert("Please agree to the Terms & Conditions");

        return;
    }

    const name =
    document.getElementById("name").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const pass =
    document.getElementById("pass").value.trim();

    // CHECK EMPTY
    if(!name || !email || !pass){

        alert("Please fill all fields");

        return;
    }

    const userData = {
        name,
        email,
        pass
    };

    // SAVE USER
    localStorage.setItem(
        "user",
        JSON.stringify(userData)
    );

    alert("Account Created Successfully!");

    // CLEAR INPUTS
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("pass").value = "";

    show("signin");
}

// LOGIN
function login(event){

    event.preventDefault();

    const loginAgree =
    document.getElementById("loginAgree");

    // CHECK TERMS
    if(!loginAgree.checked){

        alert("Please agree to the Terms & Conditions");

        return;
    }

    const email =
    document.getElementById("loginEmail").value.trim();

    const pass =
    document.getElementById("loginPass").value.trim();

    // GET USER
    const savedData =
    localStorage.getItem("user");

    // NO ACCOUNT
    if(!savedData){

        alert("No account found. Please create an account first.");

        return;
    }

    const saved =
    JSON.parse(savedData);

    // LOGIN VALIDATION
    if(
        saved.email === email &&
        saved.pass === pass
    ){

        user = saved;

        // LOAD PROFILE INFO
        document.getElementById("editName").value =
        saved.name;

        document.getElementById("editEmail").value =
        saved.email;

        // CLEAR LOGIN INPUTS
        document.getElementById("loginEmail").value = "";
        document.getElementById("loginPass").value = "";

        show("dashboard");

    }else{

        alert("Invalid Email or Password");
    }
}

// OPEN PROFILE
function openProfile(){

    if(user){

        document.getElementById("editName").value =
        user.name;

        document.getElementById("editEmail").value =
        user.email;
    }

    show("profile");
}

// SAVE PROFILE
function saveProfile(){

    const newName =
    document.getElementById("editName").value.trim();

    const newEmail =
    document.getElementById("editEmail").value.trim();

    // VALIDATION
    if(!newName || !newEmail){

        alert("Please fill all fields");

        return;
    }

    const saved =
    JSON.parse(localStorage.getItem("user"));

    saved.name = newName;
    saved.email = newEmail;

    localStorage.setItem(
        "user",
        JSON.stringify(saved)
    );

    user = saved;

    alert("Profile Updated Successfully!");
}

// ADAPTIVE DIFFICULTY
function adjustDifficulty(){

    let total =
    stats.correct + stats.wrong;

    let accuracy =
    total > 0
    ? (stats.correct / total) * 100
    : 0;

    if(accuracy >= 80){

        stats.difficulty = "Hard";

    }else if(accuracy >= 50){

        stats.difficulty = "Medium";

    }else{

        stats.difficulty = "Easy";
    }

    document.getElementById("difficulty")
    .textContent = stats.difficulty;
}

// START GAME
function startGame(){

    show("game");

    let a,b;

    if(stats.difficulty === "Easy"){

        a = Math.floor(Math.random()*10);
        b = Math.floor(Math.random()*10);

    }else if(stats.difficulty === "Medium"){

        a = Math.floor(Math.random()*20);
        b = Math.floor(Math.random()*20);

    }else{

        a = Math.floor(Math.random()*50);
        b = Math.floor(Math.random()*50);
    }

    currentAnswer = a + b;

    document.getElementById("question")
    .textContent = `${a} + ${b}`;

    document.getElementById("answer").value = "";

    setTimeout(()=>{
        document.getElementById("answer").focus();
    },100);
}

// SUBMIT ANSWER
function submitAnswer(event){

    event.preventDefault();

    const answer =
    parseInt(
        document.getElementById("answer").value
    );

    // EMPTY CHECK
    if(isNaN(answer)){

        alert("Please enter your answer");

        return;
    }

    if(answer === currentAnswer){

        stats.correct++;

        document.getElementById("resultText")
        .textContent = "✅ Correct!";

    }else{

        stats.wrong++;

        document.getElementById("resultText")
        .textContent = `❌ Wrong! Correct Answer: ${currentAnswer}`;
    }

    adjustDifficulty();

    show("result");
}

// UPDATE PROGRESS
function updateProgress(){

    document.getElementById("correctScore")
    .textContent = stats.correct;

    document.getElementById("wrongScore")
    .textContent = stats.wrong;

    let total =
    stats.correct + stats.wrong;

    let accuracy =
    total > 0
    ? Math.round((stats.correct / total) * 100)
    : 0;

    document.getElementById("accuracyScore")
    .textContent = accuracy + "%";
}