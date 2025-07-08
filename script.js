const questions = [
  {
    question: "Which is largest animal in the world?",
    answers: [
      { text: "Blue Whale", correct: true },
      { text: "African Elephant", correct: false },
      { text: "Giraffe", correct: false },
      { text: "Hippopotamus", correct: false },
    ],
  },
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false },
    ],
  },
  {
    question: "Which is the largest planet in our Solar System?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Saturn", correct: false },
      { text: "Mars", correct: false },
    ],
  },
  {
    question: "Which element has the atomic number 1?",
    answers: [
      { text: "Helium", correct: false },
      { text: "Hydrogen", correct: true },
      { text: "Oxygen", correct: false },
      { text: "Carbon", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for Gold?",
    answers: [
      { text: "Ag", correct: false },
      { text: "Au", correct: true },
      { text: "Pb", correct: false },
      { text: "Fe", correct: false },
    ],
  },
];

const questionName = document.getElementById("question");
const optionButtons = document.getElementById("options");
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
  reset();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionName.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    optionButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function reset() {
  nextButton.style.display = "none";
  while (optionButtons.firstChild) {
    optionButtons.removeChild(optionButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(optionButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  reset();
  questionName.innerHTML = `Your Scored ${score} out of ${questions.length}`;
  optionButtons.innerHTML = "";
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
