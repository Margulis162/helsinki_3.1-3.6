const express = require('express')
const morgan = require('morgan')
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


// prerouts middleware

const requestLogger = (req, resp, next) => {
  console.log('Method: ', req.method)
  console.log('Path: ', req.path)
  console.log('Body: ', req.body)
  console.log('---')
  next() //passes control to the next middleware
}

//|| uses 
  // makes my app understand incoming json 
app.use(express.json())
  // activates middleware
app.use(requestLogger)
app.use(morgan('combined'))
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

//post

const idGen = () => {
  const idsIdeal = []
  const idsTaken =[]
  let idsAvaliable = []

  //populates idsIdeal
  for(let i = 1; i<=persons.length; i++){
    idsIdeal.push(i)
  }

  //populates ids taken
  persons.forEach(person => idsTaken.push(person.id))
  //so I can has has :3
  const takenSet = new Set(idsTaken)
  //finds the difference in between two
  idsAvaliable = idsIdeal.filter(id => !takenSet.has(id))
  return  idsAvaliable.length > 0?idsAvaliable[0]:persons.length + 1 
  
    
  }
  
app.post('/api/persons/', (req,resp) => {
  const body = req.body 
  const idNum = idGen()
 
  if(!body.name || !body.phone){
    return resp.status(400).json(
      {error: 'name and/or phone is missing'}
    )
  }
  
    const found = persons.find(({name}) => {
      return name === body.name
    })
  
  if(found){
    return resp.status(400).json(
      {error: 'the name already exists'}
    )
  }

  const person = {
    id:idNum,
    name:body.name,
    phone:body.phone,
  }

  persons.push(person)
  resp.json(person)
})

// post routes middleware

const unknownEndpoint = (req, resp) => {
  resp.status(404).send({error: 'page does not exist'})
}

app.use(unknownEndpoint)

//port listener
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

