let listOfQuestions = document.querySelector('.wrapper-questions')
let windowToStartPolling = document.querySelector('.wrapper')
let buttonToStartPolling = document.querySelector('.button-start')
let buttonToConfirmAnswer = document.querySelector('.button-confirm-answer')


listOfQuestions.classList.add('display-none')

buttonToStartPolling.addEventListener('click', startPolling)

function startPolling() {
    windowToStartPolling.classList.add('display-none')
    listOfQuestions.classList.remove('display-none')
}