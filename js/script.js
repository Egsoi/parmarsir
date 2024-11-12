
const floatingBox = document.getElementById('floatingBox');
const themeBox = document.getElementById('themeBox');


// Toggle the floating box visibility
function toggleFloatingBox() {
   if (floatingBox.classList.contains('show')) {
      closeFloatingBox();
   } else {
      openFloatingBox();
   }
}

// Open the floating box with animation
function openFloatingBox() {
   floatingBox.classList.add('show');
}

// Close the floating box with animation
function closeFloatingBox() {
   floatingBox.classList.remove('show');
}

// Set the theme and update the box content
function setTheme(theme, themeName) {
   document.documentElement.className = theme; // Apply theme to the document
   themeBox.textContent = themeName; // Update box content
   closeFloatingBox(); // Hide floating box after selection
}

document.addEventListener('DOMContentLoaded', function() {
   setTheme('dark-mode', 'Dark');
});

// Click outside to close the floating box
window.onclick = function(event) {
   if (!themeBox.contains(event.target) && !floatingBox.contains(event.target)) {
      closeFloatingBox();
   }
};






const start_btn = document.querySelector(".start_btn button");
const svgContainer = document.getElementById("svg");

const quiz_box = document.querySelector(".quiz_box");

const result_box = document.querySelector(".result_box");

const option_list = document.querySelector(".option_list");

const time_line = document.querySelector("header .time_line");

const timeText = document.querySelector(".timer .time_left_txt");

const timeCount = document.querySelector(".timer .timer_sec");


let correctQuestions = [];
let incorrectQuestions = [];
let timedOutQuestions = [];

let answeredQuestions = [];

start_btn.onclick = () => {

   quiz_box.classList.add("activeQuiz");
startTimer(timeValue);
   showQuetions(0);

   queCounter(1);
   startTimerLine(0);

   start_btn.style.display = "none";

   const elements = document.querySelectorAll('.start_btn');

   elements.forEach(element => {
      element.style.display = 'none';
   });

};



const timeRange = document.getElementById('timeRange');
const timeValueDisplay = document.getElementById('timeValueDisplay');

// Set initial time value
let timeValue = timeRange.value;

// Update the timeValue when the range changes
timeRange.addEventListener('input', function() {
   timeValue = timeRange.value;
   timeValueDisplay.textContent = timeValue; // Update displayed time
});


let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const quit_quiz = result_box.querySelector(".buttons .quit");

quit_quiz.onclick = () => {
   //  if (confirm('Do you want to replay the quiz? \n\nYou can see review of all questions')) {
   {
      location.reload();
   }

};

const next_btn = document.querySelector("footer .next_btn");

const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = () => {
   if (que_count < questions.length - 1) {
      que_count++;
      que_numb++;
      showQuetions(que_count);
      queCounter(que_numb);
      clearInterval(counter);
      clearInterval(counterLine);
      startTimer(timeValue);
      startTimerLine(widthValue);
      timeText.textContent = "Time Left";
      next_btn.classList.remove("show");

      svgContainer.innerHTML = "";

      if (que_count === questions.length - 1) {
         next_btn.textContent = "Finish";
      }

   } else {
      clearInterval(counter);
      clearInterval(counterLine);
      showResult();
   }
};

function showQuetions(index) {
   const que_text = document.querySelector(".que_text");
   const Shift_text = document.querySelector(".Shift_text");
   const HindiQue_text = document.querySelector(".HindiQue_text");

   let que_tag = '<p class="quesNum">' + (index + 1) + '</p>. ' + questions[index].question + '</span>';

   let Shift_tag = questions[index].Shift ? questions[index].Shift : "";

   let option_tag =
      '<div class="option"><span>' + questions[index].options[0] + '</span></div>' +
      '<div class="option"><span>' + questions[index].options[1] + '</span></div>' +
      '<div class="option"><span>' + questions[index].options[2] + '</span></div>' +
      '<div class="option"><span>' + questions[index].options[3] + '</span></div>';

   let HindiQue_tag = questions[index].HindiQue ? questions[index].HindiQue : "";

   que_text.innerHTML = que_tag;
   Shift_text.innerHTML = Shift_tag;
   option_list.innerHTML = option_tag;
   HindiQue_text.innerHTML = HindiQue_tag;

   const option = option_list.querySelectorAll(".option");
   for (let i = 0; i < option.length; i++) {
      option[i].setAttribute("onclick", "optionSelected(this)");
   }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

let currentIndex = 0;

function initializeQuiz() {
   shuffleQuestions();
   showQuestions();
}

/*

function shuffleQuestions() {
   for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
  [questions[i], questions[j]] = [questions[j], questions[i]];

      questions[i].options = shuffleArray(questions[i].options);
   }
}

function shuffleArray(array) {
   let shuffledArray = array.slice(); 
   for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
  [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
   }
   return shuffledArray; 
}

*/

function optionSelected(answer) {
   clearInterval(counter);
   clearInterval(counterLine);

   let userAns = answer.textContent.trim();
   let correctAns = questions[currentIndex].answer.trim();

   currentIndex++;
}

initializeQuiz();

function showResult() {
   quiz_box.classList.remove("activeQuiz");
   result_box.classList.add("activeResult");
   const scoreText = result_box.querySelector(".score_text");

   let scoreTag =
      "<p> You got <span>" + userScore + " </span> out of <span> " + questions.length + "</span</p>";
   scoreText.innerHTML = scoreTag;
}

function startTimerLine() {
   const totalTime = timeValue * 1000 / 20;
   let time = 0;

   counterLine = setInterval(timer, 20);

   function timer() {
      time += 1;

      time_line.style.width = (time / totalTime) * 93.5 + "vw";

      if (time >= totalTime) {
         clearInterval(counterLine);
      }
   }
}

function queCounter(index) {

   let totalQueCounTag =
      "<span><p>" + index + "</p> of <p>" + questions.length + "</p> Questions</span>";

   bottom_ques_counter.innerHTML = totalQueCounTag;
}


function showReviewQuestions() {
   const timeline = document.querySelector(".time_line");
   if (timeline) {
      timeline.style.display = "none";
   }

   const timeLeftText = document.querySelector(".timer");
   if (timeLeftText) {
      timeLeftText.style.display = "none";
   }

   que_count = 0;
   quiz_box.classList.add("activeQuiz");
   result_box.classList.remove("activeResult");

   combineAnsweredQuestions();

   showAnsweredQuestion(que_count);
}

function optionSelected(answer) {
   clearInterval(counter);
   clearInterval(counterLine);

   let userAns = answer.textContent.trim();
   let correctAns = questions[que_count].answer.trim();
   const allOptions = option_list.children.length;

   let isCorrect = userAns === correctAns;

   if (isCorrect) {
      correctQuestions.push({
         questionIndex: que_count,
         question: questions[que_count].question,
         userAnswer: userAns,
         correctAnswer: correctAns,
         correct: true
      });
      userScore += 1;

      answer.classList.add("correct");
      answer.insertAdjacentHTML("beforeend", tickIconTag);


    // playAnimation();

   }
   else {
      incorrectQuestions.push({
         questionIndex: que_count,
         question: questions[que_count].question,
         userAnswer: userAns,
         correctAnswer: correctAns,
         correct: false
      });
      answer.classList.add("incorrect");
      answer.insertAdjacentHTML("beforeend", crossIconTag);

      for (let i = 0; i < allOptions; i++) {
         if (option_list.children[i].textContent.trim() === correctAns) {
            option_list.children[i].classList.add("correct");
            option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
         }
      }
   }

   for (let i = 0; i < allOptions; i++) {
      option_list.children[i].classList.add("disabled");
   }

   next_btn.classList.add("show");
}

function playAnimation() {
   svgContainer.style.display = "block";

   const animItem = lottie.loadAnimation({
      container: svgContainer,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: "https://assets2.lottiefiles.com/packages/lf20_u4yrau.json"
   });

   animItem.addEventListener('complete', () => {
      svgContainer.style.display = "none";
      svgContainer.innerHTML = "";
   });
}

function startTimer(time) {
   timeCount.textContent = time;
   counter = setInterval(timer, 1000);

   function timer() {
      time--;
      if (time >= 0) {
         timeCount.textContent = time < 10 ? `0${time}` : time;
      }
      if (time < 1) {
         clearInterval(counter);
         timeText.textContent = "Time Off";

         const allOptions = option_list.children.length;
         let correctAns = questions[que_count].answer;

         for (let i = 0; i < allOptions; i++) {
            option_list.children[i].classList.add("disabled");
         }

         for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent.trim() === correctAns) {
               option_list.children[i].classList.add("correct");
               option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
            }
         }

         const que_text = document.querySelector(".que_text");
         const badge_tag = '<div class="badge timeout-badge">Time is out</div>';
         que_text.innerHTML = badge_tag + que_text.innerHTML;

         timedOutQuestions.push({
            questionIndex: que_count,
            question: questions[que_count].question,
            userAnswer: "Time Out",
            correctAnswer: correctAns,
            correct: false
         });

         next_btn.classList.add("show");
      }
   }
}

function showAnsweredQuestion(index) {
   if (index < 0 || index >= answeredQuestions.length) {
      console.error("Invalid question index.");
      return;
   }

   const que_text = document.querySelector(".que_text");
   const Shift_text = document.querySelector(".Shift_text");
   const option_list = document.querySelector(".option_list");
   const HindiQue_text = document.querySelector(".HindiQue_text");

   const question = questions.find(q => q.question === answeredQuestions[index].question);

   if (!question) {
      console.error("Question not found.");
      return;
   }

   const userAnswer = answeredQuestions[index].userAnswer;
   const correctAnswer = answeredQuestions[index].correctAnswer;
   let que_tag = `<p class="quesNum">${answeredQuestions[index].questionIndex + 1}.</p> ${answeredQuestions[index].question}`;

   let badge_tag = '';
   if (userAnswer === "Time Out") {
      badge_tag = `<div class="badge timeout-badge">Time out question</div>`;
   }

   let option_tags = question.options.map(option => {
      let className = '';
      let iconTag = '';

      if (option === correctAnswer) {
         className = 'correct';
         iconTag = tickIconTag;
      } else if (option === userAnswer && userAnswer !== "Time Out") {
         className = 'incorrect';
         iconTag = crossIconTag;
      }
      return `<div class="option ${className}"><span>${option}</span>${iconTag}</div>`;
   }).join('');

   que_text.innerHTML = badge_tag + que_tag;
   Shift_text.innerHTML = question.Shift || "";
   option_list.innerHTML = option_tags;

   HindiQue_text.innerHTML = question.HindiQue || "";

   next_btn.onclick = () => {
      if (index < answeredQuestions.length - 1) {
         showAnsweredQuestion(index + 1);
      } else {
         result_box.classList.add("activeResult");
         quiz_box.classList.remove("activeQuiz");
      }
   };

   next_btn.classList.add("show");
}

function combineAnsweredQuestions() {
   answeredQuestions = [
      ...correctQuestions,
      ...incorrectQuestions,
      ...timedOutQuestions
    ];

   answeredQuestions.sort((a, b) => a.questionIndex - b.questionIndex);
}

function styleButtons() {
   const buttons = document.querySelectorAll('.option-btn');
   buttons.forEach(button => {
      button.style.width = 'auto';

      button.style.margin = '8px';

   });
}

function toggleReviewOptions() {
   const reviewOptions = document.getElementById('reviewOptions');
   const isVisible = reviewOptions.style.display === 'block';

   reviewOptions.style.transition = 'opacity 0.5s';
   reviewOptions.style.opacity = isVisible ? '0' : '1';

   setTimeout(() => {
      reviewOptions.style.display = isVisible ? 'none' : 'block';
      if (!isVisible) styleButtons();
   }, 500);

   const totalCorrect = correctQuestions.length;
   const totalIncorrect = incorrectQuestions.length;
   const totalTimedOut = timedOutQuestions.length;
   const totalQuestions = totalCorrect + totalIncorrect + totalTimedOut;

   reviewOptions.querySelector("button[onclick=\"handleReviewOption('all')\"]").innerText = `All (${totalQuestions})`;

   const timedOutButton = reviewOptions.querySelector("button[onclick=\"handleReviewOption('timedOut')\"]");
   if (totalTimedOut > 0) {
      timedOutButton.innerText = `Timed Out (${totalTimedOut})`;
      timedOutButton.style.display = 'block';
   } else {
      timedOutButton.style.display = 'none';
   }

   const incorrectButton = reviewOptions.querySelector("button[onclick=\"handleReviewOption('incorrect')\"]");
   if (totalIncorrect > 0) {
      incorrectButton.innerText = `Incorrect (${totalIncorrect}+${totalTimedOut}=${totalIncorrect+totalTimedOut})`;
      incorrectButton.style.display = 'block';
   } else {
      incorrectButton.style.display = 'none';
   }
}

function handleReviewOption(option) {

   const reviewOptions = document.getElementById('reviewOptions');
   reviewOptions.style.opacity = '0';
   reviewOptions.style.transition = 'opacity 0.5s';

   setTimeout(() => {
      reviewOptions.style.display = 'none';
   }, 500);

   combineAnsweredQuestions(option);

   showReviewQuestions();
}

function combineAnsweredQuestions(filter) {
   if (filter === 'all') {
      answeredQuestions = [
        ...correctQuestions,
        ...incorrectQuestions,
        ...timedOutQuestions
      ];
   } else if (filter === 'timedOut') {
      answeredQuestions = [
        ...timedOutQuestions
      ];
   } else if (filter === 'incorrect') {
      answeredQuestions = [
        ...incorrectQuestions,
        ...timedOutQuestions
      ];
   }

   answeredQuestions.sort((a, b) => a.questionIndex - b.questionIndex);
}

function showReviewQuestions() {

   const timeline = document.querySelector(".time_line");
   const timeLeftText = document.querySelector(".timer");
   if (timeline) timeline.style.display = "none";
   if (timeLeftText) timeLeftText.style.display = "none";

   que_count = 0;
   quiz_box.classList.add("activeQuiz");
   result_box.classList.remove("activeResult");
   showAnsweredQuestion(que_count);

   const footer = document.querySelector("footer");
   footer.innerHTML = "";
   footer.style.justifyContent = 'space-around';

   const createButton = (text, className, callback, isVisible) => {
      const button = document.createElement("button");
      button.textContent = text;
      button.className = className;
      button.style.display = "block";
      button.style.opacity = isVisible ? "1" : "0";
      button.addEventListener("click", callback);
      return button;
   };

   const backButton = createButton("Back", "back_btn", () => {
      if (que_count > 0) {
         que_count--;
         showAnsweredQuestion(que_count);
         updateButtonVisibility();
      } else {
         console.log("This is the first question.");
      }
   }, que_count > 0);

   const forwardButton = createButton("Next", "forward_btn", () => {
      if (que_count < answeredQuestions.length - 1) {
         que_count++;
         showAnsweredQuestion(que_count);
         updateButtonVisibility();
      } else {
         console.log("This is the last question.");
      }
   }, que_count < answeredQuestions.length - 1);

   const finishButton = createButton("Finish", "finish_btn", () => {
      quiz_box.classList.remove("activeQuiz");
      result_box.classList.add("activeResult");
   }, true);

   footer.append(backButton, finishButton, forwardButton);

   function updateButtonVisibility() {
      backButton.style.opacity = que_count === 0 ? "0" : "1";
      forwardButton.style.opacity = que_count === answeredQuestions.length - 1 ? "0" : "1";
   }

   console.log("Buttons added to footer:", footer);
}
