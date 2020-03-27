'use strict'
document.cookie = 'expires=Tue, 19 Jan 2038 03:14:07 GMT'
console.log(document.cookie)
let listOfQuestions = document.querySelector('.wrapper-questions')
let windowToStartPolling = document.querySelector('.wrapper')
let buttonToStartPolling = document.querySelector('.button-start')
let buttonToConfirmAnswer = document.querySelector('.button-confirm-answer')
let windowToEndPolling = document.querySelector('.wrapper-end')

let forms = document.forms
let currentForm = forms.questions
let question1Field = questions.elements.question1




listOfQuestions.classList.add('display-none')
windowToEndPolling.classList.add('display-none')

buttonToStartPolling.addEventListener('click', startPolling)
// buttonToConfirmAnswer.addEventListener('click', startPolling)
currentForm.addEventListener('submit', submitForm)


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
            'Content-Type': 'application/json; charset=utf-8'
        },
        method:'POST',
        body: JSON.stringify(questions)
    })

    listOfQuestions.classList.add('display-none')
    windowToEndPolling.classList.remove('display-none')

}