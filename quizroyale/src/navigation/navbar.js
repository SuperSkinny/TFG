import React, { useState } from 'react'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'


const Navbar = props => {
  const [ isNavCollapsed, setIsNavCollapsed ] = useState( true );

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" aria-current="page" style={ { color: "#E06482", fontSize:20, fontWeight: "bold" }} to={'/home'}>Quiz Royale</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav">
          <li className="nav-item" >
              <Link className="nav-link" aria-current="page" to={'/tutorial'}>Tutorial</Link>
            </li>
            <li className="nav-item" >
              <Link className="nav-link" aria-current="page" to={'/ranking'}>Ranking</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to={'/contact'}>Contacto</Link>
            </li>
          
            <li className="nav-item" >
              <Link className="nav-link" aria-current="page" to={'/login'} >Iniciar sesión</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to={'/registration'}>Registro</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;