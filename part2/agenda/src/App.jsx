import { useState, useEffect } from 'react'
import Persons from "./components/persons"
import Filter from "./components/filter"
import PersonForm from "./components/form"
import personServices from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    personServices.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  console.log('render', persons.length, 'personas')

  const personsToShow = searchTerm
    ? persons.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.number.includes(searchTerm)
      )
    : persons

  const addName = (event) => {
    event.preventDefault()

    // Buscar si la persona ya existe (ignorando mayúsculas/minúsculas)
    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (existingPerson) {
      // Preguntar al usuario si desea actualizar el número
      if (window.confirm(`${newName} ya está en la agenda. ¿Deseas actualizar el número?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personServices
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            alert('Error al actualizar el número')
            console.error(error)
          })
      }
      return
    }

    // Validar si el número ya existe en la agenda
    if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} ya está en la agenda`)
      return
    }

    // Si la persona no existe, crear una nueva
    const nameObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    personServices.create(nameObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const toggleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`¿Seguro que deseas eliminar a ${personToDelete.name}?`)) {
      personServices
        .deletePerson(id)
        .then(() => {
          alert(`La ${personToDelete.name} fue eliminada correctamente`)
          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch((error) => {
          alert(`La persona ya fue eliminada del servidor`)
          setPersons(persons.filter((person) => person.id !== id))
        })
    }
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
      <h2>Agenda Telefónica</h2>
      <Filter value={searchTerm} onChange={handleSearchChange} />
      <h3>Agregar un nuevo contacto</h3>
      <PersonForm onS={addName} valueA={newName} onA={handleNameChange} valueB={newNumber} onB={handleNumberChange} />
      <h3>Números</h3>
      <ul>
        <Persons persons={personsToShow} onClick={toggleDelete} />
      </ul>
    </div>
  )
}

export default App
