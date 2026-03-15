require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/Person')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))


morgan.token('body', (request) => {
    return JSON.stringify(request.body)
})

app.use(morgan((':method :url :status :res[content-length] - :response-time ms :body')))

let persons = [
    { id: "1", name: "Arto Hellas", number: "040-123456" },
    { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
    { id: "3", name: "Dan Abramov", number: "12-43-234345" },
    { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
]

//get people from database
app.get('/api/persons', (request, response) => {

    Person.find({}).then(persons => {
        response.json(persons)
    })

})


// Exercise 3.2: GET /info page
// TODO: Implement this route
app.get('/info', (request, response) => {
    response.send(
        `<p> Phonebook has info for ${persons.length} people </p>`
        + `<p> ${new Date()} </p>`
    )
})


// Exercise 3.3: GET single person by id
// TODO: Implement this route
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find((person) => person.id === id)

    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})


// Exercise 3.4: DELETE person by id
// TODO: Implement this route
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter((person) => person.id !== id)
    response.status(204).end()
})


// Exercise 3.5: POST new person
// TODO: Implement this route
app.post('/api/persons', (request, response) => {

    //read incoming data
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({ error: 'name is missing' })
    }

    if (!body.number) {
        return response.status(400).json({ error: 'number is missing' })
    }

    if (persons.find(p => p.name === body.name)) {
        return response.status(400).json({ error: 'name must be unique' })
    }


    //create the person w/ unique id and data from request
    const person = {
        id: String(Math.floor(Math.random() * 1000000)),
        name: body.name,
        number: body.number
    }

    //add the person to the persons array
    persons = persons.concat(person)

    //send the created person back
    response.json(person)

})


// Exercise 3.6: Add validation to POST
// TODO: Add validation for missing name/number and duplicate names



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Phonebook server running on port ${PORT}`)
})

