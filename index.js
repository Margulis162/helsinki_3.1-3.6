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

//post

const idGen = () => {
  let nextId = 0
  const takenIds = new Set()

  const indeces = () =>{ 
    let arr = []
    for(let i = 0; i<=persons.length; i++){
      arr.push[i]
    }
    return new Set(arr)
  }

  persons.forEach(person => takenIds.add(person.id))

  //FIXIT: what are you even trying to say here, Mark? 
  const idsAvaliable = idsAvaliable.difference(takenIds)

  if(idsAvaliable.length > 0){
    const arr = Array.from(idsAvaliable)
     return nextId = arr[0]
  }else{
    return nextId = persons.length + 1
  }
}

app.post('/api/persons/', (req,resp) => {
  const body = req.body 

  if(!body.name){
    return resp.status(400).json(
      {error: 'name missing'}
    )
  }

  const person = {
    id:idGen(),
    name:body.name,
    phone:body.phone,
  }

  persons.concat(person)
  resp.json(person)
})

//port listener
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
