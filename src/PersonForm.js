import React from 'react';

const PersonForm = (props) => {
  let { addPerson, newNumber, handleNameChange, handleNumberChange, newName } =
    props;

  return (
    <form onSubmit={addPerson}>
      <div className="row">
        <div className="col mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            value={newName}
            placeholder="Enter name"
            name="name"
            id="name"
            onChange={handleNameChange}
            className="form-control"
          />
          {''}
        </div>
        <div className="col mb-3">
          <label htmlFor="number" className="form-label">
            Number:
          </label>
          <input
            type="number"
            value={newNumber}
            id="number"
            placeholder="Enter number"
            name="number"
            onChange={handleNumberChange}
            className="form-control"
          />
        </div>
      </div>
      <button type="submit" className="btn btn-success">
        add
      </button>
    </form>
  );
};

export default PersonForm;
