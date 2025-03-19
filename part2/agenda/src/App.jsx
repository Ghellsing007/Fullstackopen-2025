import { useState, useEffect } from 'react'
import Persons from "./components/persons"
import Filter from "./components/filter"
import PersonForm from "./components/form"
import personServices from "./services/persons"
import Notificacion from "./components/notificacion"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successfulMessage, setSuccessfulMessage] = useState(null)



  useEffect(function() {
    personServices.getAll()
      .then(function(initialPersons) {
        if (!initialPersons || initialPersons.length === 0) {
          throw new Error("No hay datos disponibles en el servidor.");
        }
        setPersons(initialPersons);
      })
      .catch(function(error) {
        console.error("Error al obtener datos del servidor:", error);
        setMessage("Error al obtener datos del servidor. Verifique su conexión.", "error");
      });
  }, []);
  

  console.log('render', persons.length, 'personas')

  const personsToShow = searchTerm
    ? persons.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.number.includes(searchTerm)
      )
    : persons

    const addName = (event) => {
      event.preventDefault();
  
      // Validar que los campos no estén vacíos
      if (!newName.trim() || !newNumber.trim()) {
          alert("Por favor, completa ambos campos.");
          return;
      }
  
      // Buscar si la persona ya existe (ignorando mayúsculas/minúsculas)
      const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
  
      if (existingPerson) {
          if (window.confirm(`${newName} ya está en la agenda. ¿Deseas actualizar el número?`)) {
              const updatedPerson = { ...existingPerson, number: newNumber };
  
              personServices
                  .update(existingPerson.id, updatedPerson)
                  .then((returnedPerson) => {
                      setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
                      setNewName('');
                      setNewNumber('');
                      setMessage(`El contacto de '${newName}' fue actualizado correctamente.`, 'success');
                  })
                  .catch(error => {
                      setMessage(`Error al actualizar el número de '${newName}'.`, 'error');
                      console.error(error);
                  });
          }
          return;
      }
  
      // Validar si el número ya existe en la agenda
      if (persons.some(person => person.number === newNumber)) {
          alert(`${newNumber} ya está en la agenda.`);
          return;
      }
  
      // Crear objeto sin ID (el backend asignará el ID)
      const nameObject = {
          name: newName,
          number: newNumber
      };
  
      personServices
          .create(nameObject)
          .then((returnedPerson) => {
              setPersons(persons.concat(returnedPerson));
              setNewName('');
              setNewNumber('');
              setMessage(`El contacto de '${newName}' fue agregado correctamente.`, 'success');
          })
          .catch((error) => {
              console.error(error); 
  
              // ✅ Verifica si el error proviene del backend y tiene un mensaje
              if (error.response && error.response.data && error.response.data.error) {
                  setMessage(error.response.data.error, 'error');
              } else {
                  setMessage(`Error al agregar el contacto de '${newName}' al servidor.`, 'error');
              }
          });
  };
  
  // Función reutilizable para mostrar mensajes
  const setMessage = (message, type) => {
      if (type === 'success') {
          setSuccessfulMessage(message);
          setTimeout(() => setSuccessfulMessage(null), 5000);
      } else {
          setErrorMessage(message);
          setTimeout(() => setErrorMessage(null), 8000);
      }
  };
  
  
  // Función reutilizable para mostrar mensajes
  const showMessage = (message, type) => {
      if (type === 'success') {
          setSuccessfulMessage(message);
          setTimeout(() => setSuccessfulMessage(null), 5000);
      } else {
          setErrorMessage(message);
          setTimeout(() => setErrorMessage(null), 5000);
      }
  };
  

  const toggleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`¿Seguro que deseas eliminar a ${personToDelete.name}?`)) {
      personServices
        .deletePerson(id)
        .then(() => {
          alert(`La persona ${personToDelete.name} fue eliminada correctamente`)
          setPersons(persons.filter(person => person.id !== id)); 
          
          setErrorMessage(`el contacto de '${personToDelete.name}' fue eliminado`);
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)       
          
        })
        .catch((error) => {
          setErrorMessage(`Error al eliminar el contacto de '${personToDelete.name}' del servidor `)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          
          
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
      <Notificacion message={errorMessage} clase={"error"} />
      <Notificacion message={successfulMessage} clase={"success"} />
      <Filter value={searchTerm} onChange={handleSearchChange} />
      <h3>Agregar un nuevo contacto</h3>
      <PersonForm 
        onS={addName} 
        valueA={newName} 
        onA={handleNameChange} 
        valueB={newNumber} 
        onB={handleNumberChange} 
      />
      <h3>Números</h3>
      <ul>
        <Persons persons={personsToShow} onClick={toggleDelete} />
      </ul>
    </div>
  )
}

export default App
