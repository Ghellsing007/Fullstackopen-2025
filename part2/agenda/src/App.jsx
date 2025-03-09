import { useState } from 'react'
import Persons from "./components/persons"
import Filter from "./components/filter"
import PersonForm from "./components/form"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const personsToShow = searchTerm
    ? persons.filter(person => 
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        person.number.includes(searchTerm)
      )
    : persons

  const addName = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }

    const nameObject = {
      id: persons.length + 1, 
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchTerm} onChange={handleSearchChange}/>
      <h3>Add a new</h3>
      <PersonForm onS={addName} valueA={newName} onA={handleNameChange} valueB={newNumber} onB={handleNumberChange} />
      <h3>Numbers</h3>
      <ul>    
        <Persons persons={personsToShow} />      
      </ul>
    </div>
  )
}

export default App
