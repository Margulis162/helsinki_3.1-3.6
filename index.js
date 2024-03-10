const express = require('express')
const app = express()

// console.log(app)

let persons = [
        { 
          "id": 1,
          "name": "Arto Hellas", 
          "number": "040-123456"
        },
        { 
          "id": 2,
          "name": "Ada Lovelace", 
          "number": "39-44-5323523"
        },
        { 
          "id": 3,
          "name": "Dan Abramov", 
          "number": "12-43-234345"
        },
        { 
          "id": 4,
          "name": "Mary Poppendieck", 
          "number": "39-23-6423122"
        }
    ]

    
//|| uses 
  // makes my app understand incoming json 
app.use(express.json())


//||gets

app.get('/', (req, resp) => {
  resp.send('<h2>this is a very serious node server</h2>')
})

app.get('/api/', (req, resp) => {
  resp.send('<h3>hello</h3>')
})

app.get('/api/persons', (req, resp) => {
  resp.json(persons) 
})

app.get('/api/persons/:id', (req, resp) => {
  const id  = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if(person){
    resp.json(person)
  }else{
    resp.status(404).end()
  }
})

app.get('/info/', (req,resp) => {

  const time = new Date()
  const numOfContacts = persons.length

  resp.send(`<p>Phonebook has info for ${numOfContacts} people</p><br/><p>${time}</p>`)
})

//delete

app.delete('/api/persons/:id', (req,resp) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  resp.status(204).end()
})

//port listener
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
