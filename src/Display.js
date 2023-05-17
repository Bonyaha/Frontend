import React from 'react';

const Display = ({ name, number, deleteNum, id }) => {
  //console.log(info);
  return (
    <li className="list-group-item">
      {name}: {number}{' '}
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => deleteNum(id, name)}
      >
        DELETE
      </button>
    </li>
  );
};

export default Display;
