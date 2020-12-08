const subjects = [
    "Artes",
    "Biologia",
    "Ciências",      
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

function getSubject(subjectNumber) {         // Transformar o número em dia da semana
    const position = +subjectNumber - 1 // -1 pois a primeira matéria está na posição 0 do Array
    return subjects[position]
}

function convertHoursToMinutes(time) {
    const [hour, minutes] = time.split(":") // divide a string onde tem ':', retorna um Array de 2 posições
    return Number ((hour * 60) + minutes)
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}