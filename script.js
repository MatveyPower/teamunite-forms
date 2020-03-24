'use strict'
let listOfQuestions = document.querySelector('.wrapper-questions')
let windowToStartPolling = document.querySelector('.wrapper')
let buttonToStartPolling = document.querySelector('.button-start')
let buttonToConfirmAnswer = document.querySelector('.button-confirm-answer')

let form = document.forms
let questions = form.questions
let question1Field = questions.elements.question1




listOfQuestions.classList.add('display-none')

buttonToStartPolling.addEventListener('click', startPolling)
// buttonToConfirmAnswer.addEventListener('click', startPolling)
buttonToConfirmAnswer.addEventListener('submit', submitForm)


function startPolling() {
    windowToStartPolling.classList.add('display-none')
    listOfQuestions.classList.remove('display-none')
}

function submitForm(event){
    event.preventDefault()

    const api = 'https://httpbin.org/post'

    let questions = {
        question1: question1Field.value
    }

    fetch(api,{
        headers:{
            'Content-Type': 'application/json; charset=utf-8 '
        },
        method:'POST',
        body: JSON.stringify(questions)
    })
}