import { useState, useEffect } from 'react'
import NewForm from './components/NewForm'
import Show from './components/Show'
import InputBar from './components/InputBar'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  },[])
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const addPeople = (event) => {
    event.preventDefault()
    if (persons.some(element => element.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')
  }
  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <InputBar label='filter show with' trackValue={filterValue} onChange={handleFilterValueChange} />
      <h2>add a new</h2>
      <NewForm newName={newName} newNumber={newNumber} onNameChange={handleNewName} onNumberChange={handleNewNumber} onClick={addPeople}/>
      <h2>Numbers</h2>
       <Show filterValue={filterValue} persons={persons} />
    </div>
  )
}

export default App