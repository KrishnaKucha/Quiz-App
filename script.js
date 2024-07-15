const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            {text: "Hyperlinks and Text Markup Language", correct: false},
            {text: "Hyper Text Markup Language", correct: true},
            {text: "Home Tool Markup Language", correct: false},
            {text: "Home Text Markup Language", correct: false},
        ]
    },
    {
        question: "Who is making the Web standards?",
        answers: [
            {text: "The World Wide Web Consortium", correct: true},
            {text: "Mozilla", correct: false},
            {text: "Microsoft", correct: false},
            {text: "Google", correct: false},
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            {text: "Computer Style Sheets", correct: false},
            {text: "Colorful Style Sheets", correct: false},
            {text: "Creative Style Sheets", correct: false},
            {text: "Cascading Style Sheets", correct: true},
        ]
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        answers: [
            {text: "styles", correct: false},
            {text: "font", correct: false},
            {text: "class", correct: false},
            {text: "style", correct: true},
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: [
            {text: "msgBox('Hello World');", correct: false},
            {text: "alert('Hello World');", correct: true},
            {text: "alertBox('Hello World');", correct: false},
            {text: "msg('Hello World');", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(answer));
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(answer) {
    if (answer.correct) {
        score++;
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct");
        }else {
            button.classList.add("incorrect");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

startQuiz();
