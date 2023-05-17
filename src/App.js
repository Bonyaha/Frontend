import { useEffect, useState } from 'react';
import Notification from './Notification';
import ErrorNotification from './ErrorNotification';
import Search from './Search';
import PersonForm from './PersonForm';
import Persons from './Persons';
import noteService from './services/notes';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNumber] = useState('');
  const [filtered, setFiltered] = useState(persons);
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  //console.log(filtered);
  useEffect(() => {
    noteService.getAll().then((res) => {
      setPersons(res);
      setFiltered(res);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    let id = checkingExistense(e);
    if (id) {
      updatingNum(id);
    } else {
      const newPerson = { name: newName, number: newNumber };
      noteService.create(newPerson).then((response) => {
        setPersons(persons.concat(response));
        setFiltered(persons.concat(response));
        setNewName('');
        setNumber('');
        setNotification(`Added ${newName}`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
    }
  };

  const updatingNum = (id) => {
    window.confirm(
      `${newName} is already added to phonebook, replace the old number with the new one?`
    );
    const newPerson = { name: newName, number: newNumber };
    noteService
      .update(id, newPerson)
      .then((returnedNote) => {
        setFiltered(
          filtered.map((person) => (person.id !== id ? person : returnedNote))
        );
        setNewName('');
        setNumber('');
        setNotification(`The old number of ${newName} is replaced `);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      //if that person had already been removed
      .catch((e) => {
        setErrorMessage(
          `The information of ${newName} has already been removed, please refresh the page `
        );
        setNewName('');
        setNumber('');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };
  //Check if person already exist in our book(it's not the same as checking function - the difference is target (button and input))
  const checkingExistense = (e) => {
    e.preventDefault();
    let query = e.target.querySelector('#name').value;
    console.log(query);
    const target = persons.find((person) => person.name === query);

    if (target) return target.id;
  };

  const handleNameChange = (e) => {
    //console.log(e.target.value);
    setNewName(e.target.value);

    checking(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  //Check if person already exist in our book
  const checking = (value) => {
    return persons.forEach((person) => {
      if (person.name === value)
        alert(`${value} is already added to phonebook`);
    });
  };
  //search for person
  const filterPersons = (e) => {
    const query = e.target.value;
    console.log(query);
    let updatedList = persons.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });

    setFiltered(updatedList);
  };

  const deleteNum = (id, name) => {
    window.confirm(`Delete person ${name}?`);

    noteService.del(id);

    let updated = persons.filter((person) => person.id !== id);
    setPersons(updated);
    setFiltered(updated);
  };

  return (
    <div className="container mt-3 w-50 ">
      <Notification message={notification} />
      <ErrorNotification message={errorMessage} />
      <h2 className="h1">Phonebook</h2>
      <Search onChange={filterPersons} />

      <br />
      <br />
      <h3>Add a new person</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filtered={filtered} deleteNum={deleteNum} />
    </div>
  );
};
/* asfasd */
export default App;
