const express = require('express')
const contacts = require('./db.json')
const app = express()

app.get('/contacts', (req, res) => {
    res.json(contacts)
})

const PORT = 8008
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})