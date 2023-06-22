import { useState } from 'react';


const SearchBox = (props) => {
    const [searchBox, setSearchBox] = useState('');
  
    const handleChange = (event) => {
      setSearchBox(event.target.value)
  
      props.changeFilter(event.target.value)
    }
  
    return <div>
      <h2>Search</h2>
      search: <input value={searchBox} type='text' onChange={e => handleChange(e)} />
    </div>
  }

export default SearchBox