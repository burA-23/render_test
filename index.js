require('dotenv').config()
const express = require('express')
const Note  = require('./models/note')
const app = express()
app.use(express.static('dist'))

{/*let notes = [
  {
    id: '1',
    content: 'HTML is easy',
    important: true,
  },
  {
    id: '2',
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: '3',
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
]
*/}


//const Note = mongoose.model('Note', noteSchema)  - I anticipate that we have imported this so we need to define it differently.


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
// already changed
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes=>{
    response.json(notes)
  })
})

// we use Mongoose findById method.
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note =>{
    response.json(note)
  })
})
  {/*const id = request.params.id
  const note = notes.find(note => note.id === id) // something needs to change over there. 

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

{/*const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0
  return String(maxId + 1)
}
*/}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    //id: generateId(),
  })

  note.save().then(savedNote =>{
    response.json(savedNote)
  })


app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter((note) => note.id !== id)

  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
