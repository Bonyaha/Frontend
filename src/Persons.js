import React from 'react'
import Display from './Display'

const Persons = ({ filtered, deleteNum }) => {
  return (
    <ol className='list-group list-group-numbered'>
      {filtered.length ? (
        filtered.map((person) => (
          <Display
            key={person.id}
            name={person.name}
            number={person.number}
            deleteNum={deleteNum}
            id={person.id}
          />
        ))
      ) : (
        <h3>User not found</h3>
      )}
    </ol>
  )
}

export default Persons
