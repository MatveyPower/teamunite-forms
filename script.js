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
window.addEventListener('load', activateLocalStorage)

function startSurvey() {
  surveyPreviewPage.classList.add('display-none')
  questionsPage.classList.remove('display-none')
}

function activateLocalStorage() {
  if (localStorage.length) {
    buttonToStartSurvey.textContent = 'Продолжить'
  }

  answerFields.forEach((answer) => {
    answer.value = localStorage.getItem(`${answer.id}`)
    answer.addEventListener('input', setAnswerValues)
  })
}

function setAnswerValues(event) {
  const answer = event.target

  localStorage.setItem(answer.id, answer.value)
}

function sendAnswers(event) {
  const warningTextParagraph = document.querySelector(
    '.questions__warning-text'
  )
  event.preventDefault()

  warningTextParagraph.classList.add('display-none')
  buttonToSendAnswers.disabled = true
  buttonToSendAnswers.classList.add('questions__button--disabled')
  buttonToSendAnswers.firstElementChild.classList.add('display-none')
  buttonToSendAnswers.lastElementChild.classList.remove('display-none')

  const url = 'https://api.teamunite.ru/api/v1/questions'

  const answers = answerFields.map((field) => field.value)

  function handleError() {
    buttonToSendAnswers.disabled = false
    buttonToSendAnswers.classList.remove('questions__button--disabled')
    buttonToSendAnswers.firstElementChild.classList.remove('display-none')
    buttonToSendAnswers.lastElementChild.classList.add('display-none')
    warningTextParagraph.classList.remove('display-none')
  }

  fetch(url, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    method: 'POST',
    body: JSON.stringify(answers),
  })
    .then((response) => {
      if (response.ok) {
        localStorage.clear()
        questionsPage.classList.add('display-none')
        surveyResultPage.classList.remove('display-none')
      } else {
        handleError()
      }
    })
    .catch((error) => {
      handleError()
    })
}
