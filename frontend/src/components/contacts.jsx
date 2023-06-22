const Contacts = ({ filteredPersons, handleDelete }) => {

    const handleClick = (event, name) => {
        handleDelete(event.target.id, name)
    }

    return <div>
      <h2>Contacts</h2>
      ...
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Number</th>
            </tr>
        </thead>
        <tbody>
            {filteredPersons.map(person => 
            <tr key={person.id}>
                <td>{person.name} </td>
                <td>{person.number}</td>
                <td><input id={person.id} type="button" value='delete' onClick={e => handleClick(e, person.name)}/></td>
            </tr>
            )}
        </tbody>
      </table>
    </div>
  }

  export default Contacts