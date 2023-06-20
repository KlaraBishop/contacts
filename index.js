'use strict'

import express from 'express'
import contacts from './db.json' assert { type: "json" }
import fs from 'fs'

const app = express()

app.use(express.json())

app.get('/info', (req, res) => {
    const numOfContacts = length
    console.log(numOfContacts)
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
    const contact = find(contact => contact.id === id)
    contact ? res.json(contact) : res.status(404).end()
})

app.post('/contacts', (req, res) => {
    const newContact = req.body

    if(contacts.find(contact => contact.name === newContact.name)){
        res.statusMessage = "Name must be unique"
        res.status(400).end()
    }

    if(!contacts.name){
        res.statusMessage = "Name is missing"
        res.status(400).end()
    }

    if(!contacts.number){
        res.statusMessage = "Number is missing"
        res.status(400).end()
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