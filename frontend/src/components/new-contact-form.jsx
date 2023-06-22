import { useState } from "react";

const NewContactForm = ({ addPerson }) => {
    const [inputs, setInputs] = useState({name: '', number: ''});
  
    const handleChange = (event) => {
      const name = event.target.id
      const value = event.target.value
  
      setInputs(inputs => ({...inputs, [name]:value}))
    }
  
    const onSubmit = (event) => {
      event.preventDefault()
      
      const newPerson = { name: inputs.name, number: inputs.number }
        
      addPerson(newPerson)
      setInputs({name: '', number: ''})
    }
  
    return <form>
      <div>
        name: <input id='name' value={inputs.name} type='text' onChange={e => handleChange(e)} />
      </div>
      <div>
        number: <input id='number' value={inputs.number} type='tel' onChange={e => handleChange(e)} />
      </div>
      <div>
        <button type="submit" onClick={e => onSubmit(e)}>add</button>
      </div>
    </form>
  }

export default NewContactForm