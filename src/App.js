import { useEffect, useState } from 'react'
import Notification from './Notification'
import ErrorNotification from './ErrorNotification'
import Search from './Search'
import PersonForm from './PersonForm'
import Persons from './Persons'
import contactService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationMessage, setConfirmationMessage] = useState('')
  const [confirmationCallback, setConfirmationCallback] = useState(null)

  useEffect(() => {
    contactService.getAll().then((res) => {
      setPersons(res)
    })
  }, [])
  // Filter the persons array based on the search query
  const filteredPersons = persons.filter((person) => {
    if (person && person.name) {
      return person.name.toLowerCase().includes(searchQuery.toLowerCase())
    }
    return false
  })

  const addPerson = (e) => {
    e.preventDefault()
    let id = checkingExistense(e)
    if (id) {
      updatingNum(id)
    } else {
      const newPerson = { name: name, number: number }
      contactService
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response))
          setName('')
          setNumber('')
          setNotification(`Added ${name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch((error) => {
          setErrorMessage(`${error.response.data.error}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
    const confirmationDiv = document.getElementById('confirmationDiv')
    confirmationDiv.scrollIntoView({ behavior: 'smooth' })
  }

  const updatingNum = (id, newName = name, newNumber = number) => {
    setShowConfirmation(true)
    setConfirmationMessage(
      newName === name
        ? `${name} is already added to phonebook, replace the old number with the new one?`
        : 'Update the contact?'
    )
    setConfirmationCallback(() => () => {
      const newPerson = { name: newName, number: newNumber }
      contactService
        .update(id, newPerson)
        .then((returnedNote) => {
          if (returnedNote === null) {
            setShowConfirmation(false)
            setPersons(persons.filter((person) => person.id !== id))
            setErrorMessage(
              `The information of ${newName} has already been removed`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setName('')
            setNumber('')
          } else {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedNote
              )
            )
            setShowConfirmation(false)
            setName('')
            setNumber('')
            setNotification(`The contact of ${newName} has been updated `)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          }
        })
        .catch((error) => {
          setShowConfirmation(false)
          setErrorMessage(`${error.response.data.error}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    })
    const confirmationDiv = document.getElementById('confirmationDiv')
    confirmationDiv.scrollIntoView({ behavior: 'smooth' })
  }
  //Check if person already exist in our books
  const checkingExistense = (e) => {
    e.preventDefault()
    const target = persons.find((person) => person.name === name)
    if (target) return target.id
  }

  const handleNameChange = (e) => {
    //console.log(e.target.value);
    setName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNumber(e.target.value)
  }

  //search for person
  const filterPersons = (e) => {
    const query = e.target.value
    setSearchQuery(query)
  }

  const deleteNum = (id, name) => {
    setShowConfirmation(true)
    setConfirmationMessage(`Delete person ${name}?`)
    setConfirmationCallback(() => () => {
      contactService
        .del(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
          setShowConfirmation(false)
          setNotification(`Person ${name} deleted.`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch((error) => {
          setErrorMessage(`Error deleting the contact: ${error.message}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    })
    const confirmationDiv = document.getElementById('confirmationDiv')
    confirmationDiv.scrollIntoView({ behavior: 'smooth' })
  }

  const handleConfirmation = () => {
    if (confirmationCallback) {
      confirmationCallback()
      setConfirmationCallback(null)
    }
  }
  const closeConfirmation = () => {
    setShowConfirmation(false)
    setConfirmationCallback(null)
  }

  return (
    <div className='container mt-3 w-50 '>
      <div id='confirmationDiv'>
        {showConfirmation && (
          <div className='confirmation'>
            <p className='confirmation-message'>{confirmationMessage}</p>
            <button
              className='confirmation-button'
              onClick={handleConfirmation}
            >
              Confirm
            </button>
            <button className='close-button' onClick={closeConfirmation}>
              Cancel
            </button>
          </div>
        )}
      </div>
      <Notification message={notification} />
      <ErrorNotification message={errorMessage} />
      <h2 className='h1'>Phonebook</h2>
      <Search onChange={filterPersons} />

      <br />
      <br />
      <h3>Add a new person</h3>
      <PersonForm
        addPerson={addPerson}
        name={name}
        number={number}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        filtered={filteredPersons}
        deleteNum={deleteNum}
        updatingNum={updatingNum}
      />
    </div>
  )
}

export default App
