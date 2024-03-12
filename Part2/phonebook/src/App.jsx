import { useState } from 'react'
import NewForm from './components/NewForm'
import Show from './components/Show'
import InputBar from './components/InputBar'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
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