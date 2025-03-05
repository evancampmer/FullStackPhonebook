import { useState, useEffect } from 'react'
import Person from './Person'
import Filter from './Filter'
import PersonForm from './PersonForm'
import numberService from './services/numbers'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  const hook = () => {
    numberService
      .getAll()
      .then(initialPersons => {setPersons(initialPersons)})}

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameMap = persons.map(person => person.name)
    const idForName = persons.filter(person => person.name === newName)
    if (nameMap.includes(newName)) {
      const person = persons.find(person => person.name === newName)
      const changeNumber = {...person, number: newNumber}
      if (window.confirm(`${newName} is already added to the phonebook, would you like to change the existing phone number?`)) {
          numberService
            .update(idForName[0].id, changeNumber)
            .then(returnedNumber => {
              setPersons(persons.map(person => person.id === idForName[0].id ? returnedNumber : person))
              setSuccessMessage(`Changed ${newName}'s phone number`)
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000)
            })
            .catch(error => {
              setErrorMessage(`${person.name} was already deleted from server`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              setPersons(persons.filter(p => p.id !== idForName[0].id))
            }
            )
        }
      else {
        return (
          window.alert(`${newName} is already in phonebook`)
        )
      }
    }
    else {
    const personObject = {
      name : newName ,
      number : newNumber
    }
    numberService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setSuccessMessage(`Added ${newName}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error =>
      {console.log(error.response.data.error)}
      )
    }
  }

  const deleteEntryOf = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      setPersons(persons.filter(person => person.id !== id))
      numberService
      .deletePerson(id)
      .then(response => {
        setSuccessMessage(
          `${person.name} was already deleted from server`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setPersons(persons.filter(p => p.id != id))
      })
    }
  }

  const handleOnChange = (event) => {
    setNewName(event.target.value)
  }

  const handleOnChangeNum = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const peopleToDisplay = (newFilter === '') ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message1 = {successMessage} message2 = {errorMessage}/>
      <Filter filter = {newFilter} change = {handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addP = {addPerson} newN = {newName} changeN = {handleOnChange} newNum = {newNumber} changeNum = {handleOnChangeNum} />
      <h2>Numbers</h2>
      <div> {peopleToDisplay.map(person => 
        <Person key = {person.id} name = {person.name} number = {person.number} deleteEntry = {() => deleteEntryOf(person.id)}/>
      )}
      </div>
    </div>
  )
}

export default App