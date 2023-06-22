import { useState, useEffect } from 'react'
import Contacts from './components/contacts';
import NewContactForm from './components/new-contact-form';
import SearchBox from './components/search-box'; 
import ResponseMessage from './components/response-message';
import database from './services/database';

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [message, setMessage] = useState({ text: '', type: ''})

  const getData = () => {
    database.getAll().then(initPersons => setPersons(initPersons))
  }
  
  useEffect (() => {
    getData()
  },[])

  useEffect (() => {
    const timeout = setTimeout(() => {
      setMessage({ text: '', type: ''})
    }, 3000)
    return (() => clearTimeout(timeout))
  }, [message])

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

  const addPerson = (newPerson) => {
    
    const updateId = 1 + persons.findIndex(person => person.name === newPerson.name)

    if (updateId > 0) {
      if (window.confirm(`${newPerson.name} is already in contacts, replace number?`)) {
        database.updatePerson(updateId, newPerson)
        .then(() => getData())
        setMessage({text: `${newPerson.name} has been updated`, type: 'success'})
      }
      return
    }

    database.create(newPerson)
    .then(() => getData())
    setMessage({text: `Added ${newPerson.name}`, type: 'success'})
  }

  const changeFilter = (value) => {
    setFilterValue(value)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      database.deletePerson(id)
      .then(() => setMessage({text: `${name} has been deleted`, type: 'success'}))
      .catch(error => setMessage({ text: `${name} has already been deleted`, type: 'fail'}))
      .then(() => getData())
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ResponseMessage message={message.text} type={message.type}/>
      <NewContactForm addPerson={addPerson} />
      <SearchBox changeFilter={changeFilter} />
      <Contacts filteredPersons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App