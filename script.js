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

// TERMS NAVIGATION
function openLoginTerms(){

    show("loginTerms");
}

function agreeLoginTerms(){

    document.getElementById(
        "loginAgree"
    ).checked = true;

    show("signin");
}

// SIGNUP TERMS
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
            "Please agree to the Terms & Conditions"
        );

        return;
    }

    const name =
    document.getElementById("name")
    .value.trim();

    const email =
    document.getElementById("email")
    .value.trim();

    const pass =
    document.getElementById("pass")
    .value.trim();

    if(!name || !email || !pass){

        alert("Please fill all fields");

        return;
    }

    const userData = {
        name,
        email,
        pass
    };

    localStorage.setItem(
        "user",
        JSON.stringify(userData)
    );

    alert("Account Created!");

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
            "Please agree to the Terms & Conditions"
        );

        return;
    }

    const email =
    document.getElementById(
        "loginEmail"
    ).value.trim();

    const pass =
    document.getElementById(
        "loginPass"
    ).value.trim();

    const savedData =
    localStorage.getItem("user");

    if(!savedData){

        alert(
            "No account found. Please create an account first."
        );

        return;
    }

    const saved =
    JSON.parse(savedData);

    if(
        saved.email === email &&
        saved.pass === pass
    ){

        user = saved;

        openProfileData();

        show("dashboard");

    }else{

        alert(
            "Invalid Email or Password"
        );
    }
}

// LOAD PROFILE DATA
function openProfileData(){

    document.getElementById(
        "editName"
    ).value = user.name;

    document.getElementById(
        "editEmail"
    ).value = user.email;

    // LOAD IMAGE
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

// OPEN PROFILE
function openProfile(){

    openProfileData();

    show("profile");
}

// CHANGE PROFILE IMAGE
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

    const newName =
    document.getElementById(
        "editName"
    ).value.trim();

    const newEmail =
    document.getElementById(
        "editEmail"
    ).value.trim();

    if(!newName || !newEmail){

        alert("Please fill all fields");

        return;
    }

    const saved =
    JSON.parse(
        localStorage.getItem("user")
    );

    saved.name = newName;
    saved.email = newEmail;

    localStorage.setItem(
        "user",
        JSON.stringify(saved)
    );

    user = saved;

    alert(
        "Profile Updated Successfully!"
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

    }
    else if(accuracy >= 50){

        stats.difficulty = "Medium";

    }
    else{

        stats.difficulty = "Easy";
    }

    document.getElementById(
        "difficulty"
    ).textContent =
    stats.difficulty;
}

// START GAME
function startGame(){

    show("game");

    let a,b;

    if(stats.difficulty === "Easy"){

        a = Math.floor(Math.random()*10)+1;
        b = Math.floor(Math.random()*10)+1;

    }
    else if(stats.difficulty === "Medium"){

        a = Math.floor(Math.random()*20)+1;
        b = Math.floor(Math.random()*20)+1;

    }
    else{

        a = Math.floor(Math.random()*50)+1;
        b = Math.floor(Math.random()*50)+1;
    }

    const operations =
    ["+","-","*","/"];

    const randomOp =
    operations[
        Math.floor(
            Math.random()*operations.length
        )
    ];

    let questionText = "";

    switch(randomOp){

        case "+":

            currentAnswer = a + b;

            questionText =
            `${a} + ${b}`;

        break;

        case "-":

            if(a < b){

                let temp = a;
                a = b;
                b = temp;
            }

            currentAnswer = a - b;

            questionText =
            `${a} - ${b}`;

        break;

        case "*":

            currentAnswer = a * b;

            questionText =
            `${a} × ${b}`;

        break;

        case "/":

            b = Math.floor(Math.random()*9)+1;

            currentAnswer = a;

            let product = a * b;

            questionText =
            `${product} ÷ ${b}`;

        break;
    }

    document.getElementById(
        "question"
    ).textContent =
    questionText;

    document.getElementById(
        "answer"
    ).value = "";

    setTimeout(()=>{

        document.getElementById(
            "answer"
        ).focus();

    },100);
}

// SUBMIT ANSWER
function submitAnswer(event){

    event.preventDefault();

    const answer =
    parseInt(
        document.getElementById(
            "answer"
        ).value
    );

    if(isNaN(answer)){

        alert(
            "Please enter your answer"
        );

        return;
    }

    if(answer === currentAnswer){

        stats.correct++;

        document.getElementById(
            "resultText"
        ).textContent =
        "✅ Correct!";

    }
    else{

        stats.wrong++;

        document.getElementById(
            "resultText"
        ).textContent =
        `❌ Wrong! Correct Answer: ${currentAnswer}`;
    }

    adjustDifficulty();

    show("result");
}

// UPDATE PROGRESS
function updateProgress(){

    document.getElementById(
        "correctScore"
    ).textContent =
    stats.correct;

    document.getElementById(
        "wrongScore"
    ).textContent =
    stats.wrong;

    let total =
    stats.correct + stats.wrong;

    let accuracy =
    total > 0
    ? Math.round(
        (stats.correct / total) * 100
    )
    : 0;

    document.getElementById(
        "accuracyScore"
    ).textContent =
    accuracy + "%";
}