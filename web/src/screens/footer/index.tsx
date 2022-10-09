import React from 'react';
import { Button } from 'react-bootstrap';
import './style.css';

function Footer() {
  return (
    <footer className="text-center text-lg-start bg-dark text-muted">
      <div className="text-center p-4 text-light" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
        Desenvonvido por <b>Alan Botturi</b>
      </div>
    </footer>
  );
}

export default Footer;
