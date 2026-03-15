const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const nameFromTerminal = process.argv[3]
const numberFromTerminal = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.hbvyn5b.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

//building the factory
const Person = mongoose.model("Person", personSchema)

//building a object
const person = new Person({
    name: nameFromTerminal,
    number: numberFromTerminal
}
)

if (process.argv.length == 3) {
    Person.find().then(result => {
        result.forEach(person => console.log(person))
        mongoose.connection.close()
    })
}
else {
    person.save().then(result => {
        console.log(`added ${nameFromTerminal} number ${numberFromTerminal} to phonebook`)
        mongoose.connection.close()
    })
}


