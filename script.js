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
let question2Field = questions.elements.question2
let question3Field = questions.elements.question3
let question4Field = questions.elements.question4
let question5Field = questions.elements.question5
let question6Field = questions.elements.question6
let question7Field = questions.elements.question7
let question8Field = questions.elements.question8
let question9Field = questions.elements.question9
let question10Field = questions.elements.question10
let question11Field = questions.elements.question11




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

    const api = 'http://teamunite-backend.herokuapp.com/api/v1/questions'

    let questions = {
        question1: question1Field.value,
        question2: question2Field.value,
        question3: question3Field.value,
        question4: question4Field.value,
        question5: question5Field.value,
        question6: question6Field.value,
        question7: question7Field.value,
        question8: question8Field.value,
        question9: question9Field.value,
        question10: question10Field.value,
        question11: question11Field.value,
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