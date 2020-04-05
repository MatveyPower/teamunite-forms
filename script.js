'use strict'

const questionsPage = document.querySelector('.questions')
const surveyPreviewPage = document.querySelector('.survey-preview')
const buttonToStartSurvey = document.querySelector('.survey-preview__button')
const buttonToSendAnswers = document.querySelector('.questions__button')
const surveyResultPage = document.querySelector('.survey-result')
const answerFields = [...document.querySelectorAll('.question__answer-text')]

questionsPage.classList.add('display-none')
surveyResultPage.classList.add('display-none')

buttonToStartSurvey.addEventListener('click', startSurvey)
buttonToSendAnswers.addEventListener('click', sendAnswers)

function startSurvey() {
  surveyPreviewPage.classList.add('display-none')
  questionsPage.classList.remove('display-none')
}

function sendAnswers(event) {
  event.preventDefault()

  const url = 'https://api.teamunite.ru/api/v1/questions'

  const answers = answerFields.map((field) => field.value)

  fetch(url, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    method: 'POST',
    body: JSON.stringify(answers),
  })

  questionsPage.classList.add('display-none')
  surveyResultPage.classList.remove('display-none')
}
