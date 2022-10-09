import React from 'react';
import { Button } from 'react-bootstrap';
import './style.css';

function Error() {
  return (
    <div className='main-container-error'>
      <div className='container-error'>
        <h3>Erro 404</h3>
        <p>Pagina não encontrada</p>
      </div>
    </div>
  );
}

export default Error;
