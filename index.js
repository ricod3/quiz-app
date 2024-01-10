//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

const quizArray = [
    {
        id: "0",
        question: "Which of the following would MOST likely be used to connect one or more devices to the Internet in a SmallOffice/HomeOffice?",
        options: ["Hub", "Ethernet gateway", "Wireless access point", "Router"],
        correct: "Router",
    },
    {
        id: "1",
        question: "Which of the following peripherals would a company use to take inventory quickly and update price tags for products?",
        options: ["Barcode scanner", "Label printer", "NFC device", "Flatbed scanner"],
        correct: "Barcode scanner",
    },
    {
        id: "2",
        question: "Wich of the following cable types should be used to connect a cable modem to a SmallOffice/HomeOffice router?",
        options: ["Thunderbolt", "Ethernet", "USB", "Coaxial"],
        correct: "Ethernet",
    },
    {
        id: "3",
        question: "What does SIEM stand for?",
        options: ["Standalone Internet Embedding Managament", "Software Information Event Monitoring", "Security Information Event Management", "System Integration Engineering Management"],
        correct: "Security Information Event Management",
    },
    {
        id: "4",
        question: "What does SOC stand for?",
        options: ["Software Optimization Center", "Security Operations Center", "System Of Components", "Specs Of Cybersecurity"],
        correct: "Security Operations Center",
    },
    {
        id: "5",
        question: "In PowerShell, how can we look up the network information of our system?",
        opitions: ["ifconfig", "ipconfig", "nslookup", "nwlookup"],
        correct: "ipconfig",
    },
    {
        id: "6",
        question: "Which of these tools is a SIEM?",
        options: ["Splunk", "Microsoft Azure SIEM Protection", "Apache Grafana", "Google Cloud Security Information"],
        correct: "Splunk",
    },
    {
        id: "7",
        question: "In Ubuntu, how to check, whether firewall is active or not?",
        options: ["sudo fwl status", "sudo ufw status", "sudo fw stats", "sudo firewall stats"],
        correct: "sudo ufw status",
    },
    {
        id: "8",
        question: "Given the network mask id of 255.255.240.0, how many hosts are there?",
        options: ["256", "4094", "100", "192.168.250.252"],
        correct: "4094",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};