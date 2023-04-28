
const express = require('express')
const cors =require('cors')
const app = express()
const logger =require('./loggerMiddleware')



app.use(cors())
app.use(express.json())
app.use(logger)

let notes = [  
    {
        "id":1,
        "content": "Me tengo que suscribir en ni canel",
        "date": "2019-5-30T17:30:31.098Z",
        "important" : true
    },
    {
        "id":2,
        "content": "Tengo que estudiar las clases del Bakend",
        "date":"2019-05-30T18:39:34.091Z",
        "important": true
    },
    {
        "id":3,
        "content":"Repasar los retos de Js Nick",
        "date":"2019-05-30T19:20:15.298Z",
        "important": true
    }
]


 
// const app = http.createServer((request, response) => {
// response.writeHead(200, { 'Content-Type': 'application/json'})
// response.end(JSON.stringify(notes))
// })

app.get('/', (request, response) => {
    response.send('<h1>Hello Word</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log([id])
    const note = notes.find(note => note.id === id)
    if (notes) {
        response.json(note)
    } else {
        response.status(404).end()
    }
    
})


app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id != id)
    response.status(204).end()

})

app.post('/api/notes', (request, response) => {
    const note = request.body

    const ids = notes.map(note => note.id)
    const maxId =Math.max( ... ids)

    const newNote = {
        id:maxId  + 1,
        content: note.content,
        important :typeof note.important !== 'undefined' ? note.important : false,
        date : new Date().toISOString()

    }
    notes = [ ...notes, newNote]

    response.json(newNote)
})


app.use((request, response) => {
    response.status(404).json()
    error; "Not found"
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}` )
})
