'use strict'

import express from 'express'
import contacts from './db.json' assert { type: "json" }
import morgan from 'morgan'
import fs from 'fs'

const app = express()

morgan.token('content', (req, res) => JSON.stringify(req.body))

app.use(express.json())

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :content', {
        skip: (req, res) =>  req.method !== 'POST'
    })
)
app.use(morgan(('tiny'), {
    skip: (req, res) => req.method === 'POST'
    })
)

app.get('/info', (req, res) => {
    const numOfContacts = contacts.length
    res.send(

        `<p>Contacts has info for ${numOfContacts} people</p>
        ${Date()}`
    )
})

app.get('/contacts', (req, res) => {
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
    
    fs.writeFileSync('db.json', JSON.stringify(newContacts), (err) => {
        if(err) throw err
    })

    res.status(200).end()
})

const PORT = 8008
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})