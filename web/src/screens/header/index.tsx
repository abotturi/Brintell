import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";
import './style.css';

const menu = [
  {
    title: 'Lista de Alunos',
    route: '/list'
  },
  {
    title: 'Mapa',
    route: '/map'
  }
]

function Header() {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/">
          School Soft
        </Navbar.Brand>
        <Nav className="m-auto">
          {
            menu.map((item, idx) => {
              return(
                <NavLink key={idx} className={({ isActive, isPending }) => {
                  if(isActive){
                    return 'nav-link text-light active'
                  }else{
                    return 'nav-link'
                  }
      
                }} to={item.route}>{item.title}</NavLink>
              )
            })
          }
      </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
