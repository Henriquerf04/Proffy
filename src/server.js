                                    // express é uma biblioteca, estamos usando para rodar um servidor
const express = require('express')   // importar express
const server = express()             // passa o express pra variável server e roda o script

const {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
} = require('./pages')

const nunjucks = require('nunjucks') // importar nunjucks (template engine)
nunjucks.configure('src/views', {    // configurar nunjucks
    express: server,
    noCache: true,                   // desativa o cache
})                                

server                         // Ativando e configurando servidor
.use(express.urlencoded({ extended: true })) // precisa ativar para receber os dados do req.body
.use(express.static("public")) // configurar arquivos estáticos (css, scripts, imagens)
.get("/", pageLanding)         //rotas
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
.listen(5500)                 // porta para o servidor           
