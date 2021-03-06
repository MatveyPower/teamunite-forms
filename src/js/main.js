'use strict'

//= parts/autosize

const questionsPage = document.querySelector('.questions')
const surveyPreviewPage = document.querySelector('.survey-preview')
const buttonToStartSurvey = document.querySelector('.survey-preview__button')
const buttonToSendAnswers = document.querySelector('.questions__button')
const surveyResultPage = document.querySelector('.survey-result')
const answerFields = [...document.querySelectorAll('.question__answer-text')]
const wrapper = document.querySelectorAll('.wrapper')
const footer = document.querySelector('.footer')

autosize(answerFields)

questionsPage.classList.add('display-none')
surveyResultPage.classList.add('display-none')

buttonToStartSurvey.addEventListener('click', startSurvey)
buttonToSendAnswers.addEventListener('click', sendAnswers)

window.addEventListener('load', activateLocalStorage)

function startSurvey() {
  surveyPreviewPage.classList.add('close')
  setTimeout(() => {
    surveyPreviewPage.classList.add('display-none')
    questionsPage.classList.add('open')
    questionsPage.classList.remove('display-none')
    footer.classList.remove('display-none')
  }, 500)

  setTimeout(() => {
    questionsPage.classList.add('center')
  }, 600)
}

function activateLocalStorage() {
  let keys = Object.keys(localStorage)
  for (let key of keys) {
    if (key.slice(0, 8) === 'question' && localStorage.getItem(key)) {
      buttonToStartSurvey.textContent = 'Продолжить'
      break
    }
  }

  answerFields.forEach((answer) => {
    answer.value = localStorage.getItem(`${answer.id}`)
    answer.style.height = localStorage.getItem(`height${answer.id}`)
    answer.addEventListener('input', setAnswerValues)
  })
}

function setAnswerValues(event) {
  const answer = event.target
  const computedStyle = getComputedStyle(event.target)

  localStorage.setItem(answer.id, answer.value)
  localStorage.setItem(`height${answer.id}`, computedStyle.height)
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

  if (checkAllEmptyFields(answers)) {
    questionsPage.addEventListener('click', removeWarningTextParagraph)

    warningTextParagraph.textContent = 'Ты не заполнил(а) ни одного поля'
    handleError()
    return
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
        questionsPage.classList.add('close')
        setTimeout(() => {
          questionsPage.classList.add('display-none')
          surveyResultPage.classList.add('open')
          surveyResultPage.classList.remove('display-none')
        }, 500)

        setTimeout(() => {
          surveyResultPage.classList.add('center')
        }, 600)
      } else {
        warningTextParagraph.textContent = 'Ошибка сервера, повтори попытку'
        handleError()
      }
    })
    .catch((error) => {
      warningTextParagraph.textContent = 'Ошибка сервера, повтори попытку'
      handleError()
    })

  function handleError() {
    buttonToSendAnswers.disabled = false
    buttonToSendAnswers.classList.remove('questions__button--disabled')
    buttonToSendAnswers.firstElementChild.classList.remove('display-none')
    buttonToSendAnswers.lastElementChild.classList.add('display-none')
    warningTextParagraph.classList.remove('display-none')
  }
  function removeWarningTextParagraph(event) {
    const target = event.target

    if (target.tagName === 'TEXTAREA') {
      warningTextParagraph.classList.add('display-none')
      questionsPage.removeEventListener('click', removeWarningTextParagraph)
    }
  }
}

function checkAllEmptyFields(answers) {
  const isAllEmptyFields = answers.join('').trim() === ''

  return isAllEmptyFields
}
