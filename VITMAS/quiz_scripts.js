const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const timerContainer = document.getElementById('timer');
let timer = 60;

const myQuestions = [
    {
        question: "What is the derivative of sin(x)?",
        answers: {
            a: "cos(x)",
            b: "-sin(x)",
            c: "tan(x)"
        },
        correctAnswer: "a"
    },
    {
        question: "Find the no.of zeros in 10 x 20 x 30 x....x 1000",
        answers: {
            a: "100",
            b: "124",
            c: "120"
        },
        correctAnswer: "b"
    },
    {
        question: "What is value of log10 - log5 + log 25",
        answers:{
            a: "log 50",
            b: "1",
            c: "log 10"
        },
        correctAnswer: "a"
    }
];

function buildQuiz() {
    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];

        for (letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');

    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainers[questionNumber].style.color = 'lightgreen';
        } else {
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

function startTimer() {
    const interval = setInterval(() => {
        timer--;
        timerContainer.textContent = `Time Left: ${timer}s`;

        if (timer <= 0) {
            clearInterval(interval);
            showResults();
        }
    }, 1000);
}

buildQuiz();
startTimer();

submitButton.addEventListener('click', showResults);
