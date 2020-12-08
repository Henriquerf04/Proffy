const { weekdays } = require("../../src/utils/format");

document.querySelector("#add-time")     // Seleciona o botão
.addEventListener('click', cloneField)  // Chama função após ação de click

function cloneField() {                 // Função chamada pelo click

    // do {
    //     alert("Preencher os campos antes de adicionar novo horário")
    // } while (!weekdays.value || !time_from.value || !time_to.value)

    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true) // variável = cópia do 'schedule-item'
                                               // const - a variável 'fields' não receberá outro valor após este

    const fields = newFieldContainer.querySelectorAll('input') // Selecionar os campos input

    fields.forEach(function(field){ // Para cada campo input
        field.value = ""            // Limpar os horários do campo
    })                      

    document.querySelector('#schedule-items').appendChild(newFieldContainer) // adiciona a cópia do 'schedule-item' ao final do fieldset
}