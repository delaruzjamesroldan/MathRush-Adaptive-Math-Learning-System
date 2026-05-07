// script.js

let user = null;

let stats = {
    correct:0,
    wrong:0,
    difficulty:"Easy"
};

let currentAnswer = 0;

// SHOW SCREEN
function show(id){

    document
    .querySelectorAll(".screen")
    .forEach(screen=>{
        screen.classList.add("hidden");
    });

    document
    .getElementById(id)
    .classList.remove("hidden");

    updateAnalytics();
}

// LOGIN TERMS
function agreeLoginTerms(){

    document
    .getElementById("loginAgree")
    .checked = true;

    show("signin");
}

// GO TERMS
function goTerms(event){

    event.preventDefault();

    show("terms");
}

// SIGNUP
function signup(){

    const agree =
    document.getElementById("agree");

    if(!agree.checked){

        alert(
            "Please agree to the Terms."
        );

        return;
    }

    const userData = {

        name:
        document.getElementById("name").value,

        email:
        document.getElementById("email").value,

        pass:
        document.getElementById("pass").value
    };

    localStorage.setItem(
        "user",
        JSON.stringify(userData)
    );

    alert(
        "Account Created Successfully!"
    );

    show("signin");
}

// LOGIN
function login(event){

    event.preventDefault();

    const agree =
    document.getElementById(
        "loginAgree"
    );

    if(!agree.checked){

        alert(
            "Please agree to the Terms."
        );

        return;
    }

    const email =
    document.getElementById(
        "loginEmail"
    ).value;

    const pass =
    document.getElementById(
        "loginPass"
    ).value;

    const saved =
    JSON.parse(
        localStorage.getItem("user")
    );

    if(
        saved &&
        saved.email === email &&
        saved.pass === pass
    ){

        user = saved;

        openProfileData();

        show("dashboard");

    }else{

        alert(
            "Invalid credentials."
        );
    }
}

// PROFILE
function openProfile(){

    openProfileData();

    show("profile");
}

function openProfileData(){

    if(user){

        document.getElementById(
            "editName"
        ).value = user.name;

        document.getElementById(
            "editEmail"
        ).value = user.email;
    }

    const savedImage =
    localStorage.getItem(
        "profileImage"
    );

    if(savedImage){

        document.getElementById(
            "profilePreview"
        ).src = savedImage;
    }
}

// CHANGE PROFILE
function changeProfile(event){

    const file =
    event.target.files[0];

    if(file){

        const reader =
        new FileReader();

        reader.onload = function(e){

            document.getElementById(
                "profilePreview"
            ).src = e.target.result;

            localStorage.setItem(
                "profileImage",
                e.target.result
            );
        };

        reader.readAsDataURL(file);
    }
}

// SAVE PROFILE
function saveProfile(){

    const saved =
    JSON.parse(
        localStorage.getItem("user")
    );

    saved.name =
    document.getElementById(
        "editName"
    ).value;

    saved.email =
    document.getElementById(
        "editEmail"
    ).value;

    localStorage.setItem(
        "user",
        JSON.stringify(saved)
    );

    user = saved;

    alert(
        "Profile Updated!"
    );
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
}

// START GAME
function startGame(){

    show("game");

    let a,b;

    if(stats.difficulty === "Easy"){

        a = Math.floor(Math.random()*10)+1;
        b = Math.floor(Math.random()*10)+1;

    }else if(stats.difficulty === "Medium"){

        a = Math.floor(Math.random()*20)+1;
        b = Math.floor(Math.random()*20)+1;

    }else{

        a = Math.floor(Math.random()*50)+1;
        b = Math.floor(Math.random()*50)+1;
    }

    const operations =
    ["+","-","*","/"];

    const op =
    operations[
        Math.floor(
            Math.random()*operations.length
        )
    ];

    let question = "";

    switch(op){

        case "+":

            currentAnswer = a + b;

            question =
            `${a} + ${b}`;

        break;

        case "-":

            if(a < b){

                let temp = a;
                a = b;
                b = temp;
            }

            currentAnswer = a - b;

            question =
            `${a} - ${b}`;

        break;

        case "*":

            currentAnswer = a * b;

            question =
            `${a} × ${b}`;

        break;

        case "/":

            b = Math.floor(Math.random()*9)+1;

            currentAnswer = a;

            let product = a * b;

            question =
            `${product} ÷ ${b}`;

        break;
    }

    document
    .getElementById("question")
    .textContent = question;

    document
    .getElementById("answer")
    .value = "";
}

// SUBMIT
function submitAnswer(event){

    event.preventDefault();

    const answer =
    parseInt(
        document.getElementById(
            "answer"
        ).value
    );

    if(answer === currentAnswer){

        stats.correct++;

        document
        .getElementById("resultText")
        .textContent =
        "Correct Answer!";

    }else{

        stats.wrong++;

        document
        .getElementById("resultText")
        .textContent =
        `Wrong Answer! Correct: ${currentAnswer}`;
    }

    adjustDifficulty();

    show("result");
}

// ANALYTICS
function updateAnalytics(){

    let total =
    stats.correct + stats.wrong;

    let accuracy =
    total > 0
    ? Math.round(
        (stats.correct / total) * 100
    )
    : 0;

    document
    .getElementById("accuracyScore")
    .textContent =
    accuracy + "%";

    document
    .getElementById("difficulty")
    .textContent =
    stats.difficulty;

    document
    .getElementById("correctScore")
    .textContent =
    stats.correct;

    document
    .getElementById("wrongScore")
    .textContent =
    stats.wrong;

    document
    .getElementById("progressCorrect")
    .textContent =
    stats.correct;

    document
    .getElementById("progressWrong")
    .textContent =
    stats.wrong;

    document
    .getElementById("progressAccuracy")
    .textContent =
    accuracy + "%";
}