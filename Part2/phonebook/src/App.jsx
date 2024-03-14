import { useState, useEffect } from 'react'
import NewForm from './components/NewForm'
import Show from './components/Show'
import InputBar from './components/InputBar'
import phonebookServices from './services/phonebook'
import Message from './components/Message'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [message, setMessage] = useState(null)
  useEffect(() => {
    phonebookServices.getAll()
    .then(data => {
      setPersons(data)
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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const toUpdatePerson = persons.find(person => person.name === newName)
        const updatedPerson   = {...toUpdatePerson, number: newNumber}
        phonebookServices.update(toUpdatePerson.id, updatedPerson)
        .then(data => {
          console.log(data)
          setPersons(persons.filter(person => person.id !== toUpdatePerson.id).concat(data))
        })
        .catch(error => {
          setMessage('malFormatted number')
          setPersons(persons.filter(person => person.id !== toUpdatePerson.id))
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      phonebookServices.create(newPerson)
      .then(data => {
        setPersons(persons.concat(data))
        setMessage(`Added ${data.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })
    }
    setNewName('')
    setNewNumber('')
  }
  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value)
  }

  const handleDelete = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      phonebookServices.deletePerson(id)
      .then(data => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
      <InputBar label='filter show with' trackValue={filterValue} onChange={handleFilterValueChange} />
      <h2>add a new</h2>
      <NewForm newName={newName} newNumber={newNumber} onNameChange={handleNewName} onNumberChange={handleNewNumber} onClick={addPeople}/>
      <h2>Numbers</h2>
       <Show filterValue={filterValue} persons={persons} onClick={handleDelete}/>
    </div>
  )
}

export default App