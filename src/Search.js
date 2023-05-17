import React from 'react';

const Search = ({ onChange }) => {
  return (
    <div className="mt-1">
      <label htmlFor="search" className="form-label">
        Filter:{' '}
      </label>

      <input
        id="search"
        className="form-control"
        type="text"
        label="search"
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
