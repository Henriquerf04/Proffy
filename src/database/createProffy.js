module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) { // async para funcionar o await
    // Inserir dados na tabela de proffys
    // para quebrar linha dentro do argumento precisa usar crase
    // await para rodar o comando, depois prosseguir pra próxima linha
    const insertedProffy = await db.run(`  
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)   

    const proffy_id = insertedProffy.lastID
    
    const insertedClass = await db.run(`  
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)

    const class_id = insertedClass.lastID

    // map é uma estrutura FOR que permite retornar valores para cada posição do Array
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    await Promise.all(insertedAllClassScheduleValues)  // Aguardar rodar todas a promessas de gravação de ScheduleValues

} 