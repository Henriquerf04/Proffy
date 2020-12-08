const Database = require('./database/db')

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')
const { render, redirect, renderString } = require('nunjucks')
const queryString = 0

function pageLanding(req, res) {
    return res.render("index.html")   // configurando rotas
}

async function pageStudy(req, res) {
    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", { filters, subjects, weekdays })
    }

    const timeInMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeInMinutes}
            AND class_schedule.time_to > ${timeInMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `
    
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render('study.html', { proffys, subjects, filters, weekdays })

    } catch (error) {
        console.log(error)
    }

           
}

function pageGiveClasses(req, res) {
    return res.render("give-classes.html", { subjects, weekdays }) 
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })
    
    try {
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })
        

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0] // += significa igual ele mesmo + o que vier após
        queryString += "&time=" + req.body.time_from[0]     

        
      
        return res.render('success.html')
        
        // setTimeout (() => {
        //     return redirect("/study" + queryString)
        // }, 2000) 
        

    } catch (error) {
        console.log(error)
    }
    
}


module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}