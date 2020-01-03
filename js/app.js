const question = document.querySelector('.question');
const answersBox = document.querySelector('.answers');
const answersArr = document.querySelectorAll('.answers div');
const nextBtn = document.querySelector('#next');
const box = document.querySelector('.box');
const resultBox = document.querySelector('.result');
const container = document.querySelector('.container');

let answer = {};
let nr = 0;

const questions = [{
    id: 1,
    question: 'In which year did Maradona score a goal with his hand?',
    answers: {
      a: 1986,
      b: 1987,
      c: 1988,
      d: 1989
    },
    correct: 'a'
  },
  {
    id: 2,
    question: 'Which car won Fernando Alonso his first tittle in Formula 1 with?',
    answers: {
      a: 'Ferrari',
      b: 'Mercedez-Benz',
      c: 'Renault',
      d: 'McLaren'
    },
    correct: 'c'
  },
  {
    id: 3,
    question: 'How many times has Michael Schumacher been a Formula 1 champion?',
    answers: {
      a: 'Six times',
      b: 'Seven times',
      c: 'Five times',
      d: 'Eight times'
    },
    correct: 'b'
  }
];

const results = {
  correct: [],
  incorrect: []
};

const removeSelectedClass = () => {
  answersArr.forEach(el => {
    el.classList.remove('selected');
  });

  nextBtn.disabled = true;
}

// Gets question by id
const getQuestion = id => {
  const question = [];
  questions.forEach(el => {
    if (el.id === parseInt(id)) {
      question.push(el);
    }
  });

  return question;
}

// Checks if answer is correct and adds to results object
const checkAnswer = (id, answer) => {
  const question = getQuestion(id);
  if (question[0].correct === answer) {
    results.correct.push(id);
  } else {
    results.incorrect.push({
      id: id,
      answer: answer
    })
  }
}

// Renders view for results
const renderFinishBoard = () => {
  box.style.display = 'none';
  nextBtn.style.display = 'none';

  resultBox.textContent = `You answered ${results.correct.length}/${questions.length} correctly.`;

  results.incorrect.forEach(el => {

    const question = getQuestion(el.id);
    const box = document.createElement('div');
    box.classList.add('box');

    const questionBox = document.createElement('div');
    questionBox.classList.add('question');
    questionBox.textContent = question[0].question;
    box.appendChild(questionBox);

    const answerBox = document.createElement('div');
    answerBox.classList.add('answers');

    for (const key in question[0].answers) {
      const div = document.createElement('div');
      div.textContent = question[0].answers[key];

      if (key === el.answer) {
        div.classList.add('incorrect');
      }
      if (key === question[0].correct) {
        div.classList.add('selected');
      }
      answerBox.appendChild(div);
    }
    box.appendChild(answerBox);
    container.appendChild(box);
  });
  nextBtn.disabled = true;

  // Try Again button
  const btn = document.createElement('button');
  btn.textContent = 'Try Again';
  container.appendChild(btn);
  btn.addEventListener('click', () => {
    location.reload();
  })
}

// Renders new question
const renderQuestion = () => {
  nextBtn.disabled = true;
  answer = {};
  removeSelectedClass();

  if (nr === questions.length) {
    renderFinishBoard();
    return;
  }

  question.textContent = questions[nr].question;
  question.dataset.id = questions[nr].id;
  answersArr.forEach(el => {
    el.textContent = questions[nr].answers[el.dataset.answer]
  });

}
renderQuestion();

answersBox.addEventListener('click', e => {
  removeSelectedClass();
  if (e.target.classList[0] === 'hover') {
    e.target.classList.add('selected');

    answer.id = question.dataset.id;
    answer.answer = e.target.dataset.answer;

    nextBtn.disabled = false;
  }

});

nextBtn.addEventListener('click', e => {
  checkAnswer(answer.id, answer.answer);
  nr++;
  renderQuestion();
});
