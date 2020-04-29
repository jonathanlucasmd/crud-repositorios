/* eslint-disable react/button-has-type */
import React from 'react';

function Repository({ repository }) {
  return (
    <>
      <li key={repository.id}>{repository.title}</li>
      <button onClick={() => handleRemoveRepository(1)}>Remover</button>
    </>
  );
}

export default Repository;
