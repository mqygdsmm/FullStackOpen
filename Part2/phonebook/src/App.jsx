import { useState } from 'react'

const Show = ({persons}) => persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)

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
  const [filterPersons, setFilterPersons] = useState(persons)
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
    const value = event.target.value
    setFilterValue(value)
    setFilterPersons(persons.filter(person => person.name.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())))
  }
  return (
    <div>
      <h2>Phonebook</h2>
      filter show with <input value={filterValue} onChange={handleFilterValueChange}/>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit" onClick={addPeople}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       <Show persons={filterPersons} />
    </div>
  )
}

export default App