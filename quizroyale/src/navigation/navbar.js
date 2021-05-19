import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Button }  from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginForm from '../components/login'
import Registration from '../components/registration'
import UserRegistered from '../components/userRegistered'


const Navbar = props => {
  const [ isNavCollapsed, setIsNavCollapsed ] = useState( true );
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [modalShow3, setModalShow3] = React.useState(false);
 
  const toggleModal1 = () => {
    setModalShow2(false)
    setModalShow3(true)
  }

  const toggleModal2 = () => {
    setModalShow2(false)
    setModalShow(true)
  }

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
            <button
              className="nav-link"
              onClick={() => setModalShow(true)}
            >
              Iniciar sesión
            </button>
            <LoginForm
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            </li>
            <li className="nav-item">
              <button 
                className="nav-link" 
                onClick={() => setModalShow2(true)}
              >
                Registro
              </button>
              <Registration
                show={modalShow2}
                onHide={() => setModalShow2(false)}
                onSuccess={toggleModal1}
                onFail={toggleModal2}
              />
              <UserRegistered
                show={modalShow3}
                onHide={() => setModalShow3(false)}
              />

            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;