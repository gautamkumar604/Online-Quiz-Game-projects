
const questions = [
{
    question: "Which team is winner of T20 worldCup 2024?",
    answers: [
    {text: "England",correct: false},
    {text: "Austrailiya",correct: false},
    {text: "India",correct: true},
    {text: "South Africa",correct: false},
    ]
},
{
    question: "Who is the first 'Prime Minister' of India?",
    answers: [
    {text: "Pt.Jawaharlal Nehru",correct: true},
    {text: "Dr.Bhimrow Ambedkar",correct: false},
    {text: "Mahatma Gandhi",correct: false},
    {text: "Bhagat Singh",correct: false},
    ]
},
{
    question: "The famous Indian leader, known as the 'Iron Man of India,' played a key role in the unification of India. Who is he?",
    answers: [
    {text: "Pt.Jawaharlal Nehru",correct: false},
    {text: "Sardar Vallabhbhai Patel",correct: true},
    {text: "Subhas Chandra Bose",correct: false},
    {text: "Bhagat Singh",correct: false},
    ]
},
{
    question: "Which Indian leader was known for his role in the Quit India Movement of 1942?",
    answers: [
    {text: "Mahatma Gandhi",correct: true},
    {text: "Jawaharlal Nehru",correct: false},
    {text: "Bal Gangadhar Tilak",correct: false},
    {text: "Lala Lajpat Rai",correct: false},
    ]
},
];


const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answerButtons")
const nextButton = document.getElementById("next")
// const backButton = document.getElementById("back")

let currentQuestionIndex = 0;
let score = 0;
//   In starting position
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
//   show question code
let currentQuestion = questions[currentQuestionIndex]
let questionNo = currentQuestionIndex + 1;
questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
resetState();

//   show answer code
    currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn")
    answerButtons.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener('click',selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "block"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === 'true'){
            button.classList.add("correct");
        }
        button.disabled = 'true';
    });
}
function showScore(){
    resetState();
    questionElement.innerHTML = `Your Score ${score} out of ${questions.length} !`
    nextButton.innerHTML = "Play Again"
    // backButton.style.display = "none"
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }

}
nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
        // localStorage.clear();
    }
})
startQuiz();