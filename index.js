'use strict'

import express from 'express'
import morgan from 'morgan'
import fs from 'fs'
import cors from 'cors'

var contacts = []

const setContacts = () => {
    fs.readFile('./db.txt', (err, data) => {
        if(err) throw err;
        contacts = JSON.parse(data)
    })
}

const app = express()

morgan.token('content', (req, res) => JSON.stringify(req.body))

app.use(express.json())
app.use(cors())

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :content', {
        skip: (req, res) =>  req.method !== 'POST'
    })
)
app.use(morgan(('tiny'), {
    skip: (req, res) => req.method === 'POST'
    })
)

app.get('/', (req, res) => {
    res.send("./readme.md)
})

app.get('/info', (req, res) => {
    const numOfContacts = contacts.length
    res.send(

        `<p>Contacts has info for ${numOfContacts} people</p>
        ${Date()}`
    )
})

app.get('/contacts', (req, res) => {
    console.log(contacts)
    res.json(contacts)
})

app.get('/contacts/:id', (req, res) => {
    const id = Number(req.params.id)
    const contact = contacts.find(contact => contact.id === id)
    contact ? res.json(contact) : res.status(404).end()
})

app.post('/contacts', (req, res) => {
    const newContact = req.body

    if(contacts.find(contact => contact.name === newContact.name)){
        res.statusMessage = "Name must be unique"
        res.status(400).end()
        return
    }

    if(!newContact.name){ 
        res.statusMessage = "Name is missing"
        res.status(400).end()
        return
    }

    if(!newContact.number){
        res.statusMessage = "Number is missing"
        res.status(400).end()
        return
    }
    
    newContact['id'] = contacts.length + 1
    const newContacts = [...contacts, newContact]
    
    fs.writeFileSync('db.txt', JSON.stringify(newContacts), (err) => {
        if(err) throw err
    })

    setContacts()

    res.status(200).end()
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    setContacts()
    console.log(`Server started on port ${PORT}`)
})