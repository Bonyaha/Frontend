import React, { useState } from 'react'

const Display = ({ name, number, deleteNum, id, updatingContact }) => {
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState(name)
  const [editNumber, setEditNumber] = useState(number)

  const handleEdit = () => {
    setEditing(true)
  }

  const handleSave = () => {
    updatingContact(id, editName, editNumber)
    setEditing(false)
  }

  const handleCancel = () => {
    // Cancel the editing and revert back to the original values
    setEditName(name)
    setEditNumber(number)
    setEditing(false)
  }

  return (
    <li className='list-group-item'>
      {editing ? (
        <div>
          <input
            type='text'
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <input
            type='text'
            value={editNumber}
            onChange={(e) => setEditNumber(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          {name}: {number}{' '}
          <button
            type='button'
            className='btn btn-primary btn-sm'
            onClick={handleEdit}
          >
            Edit
          </button>{' '}
          <button
            type='button'
            className='btn btn-danger btn-sm'
            onClick={() => deleteNum(id, name)}
          >
            DELETE
          </button>
        </div>
      )}
    </li>
  )
}

export default Display
