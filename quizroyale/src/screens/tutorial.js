import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/styles/styles.css'

import { Link } from "react-router-dom";

export default class Tutorial extends Component {
  render() {
    return (

      <div  style={ { display: "flex", flexDirection: "column", alignItems: 'center' }}>  
        <div style={ { display: "flex", flexDirection: "column", alignItems: 'center' }}>
          <span className="homeTitle" >
            ¿En serio?
          </span>
          <span style={ { fontSize: 20, color: "#4F4F4F", textAlign: "center"  } } >
            Solo tienes que leer la pregunta y elegir una de las tres opciones.
          </span>
          <span className="generalTitle" >
            ¿A que és fácil?
          </span>
        </div>
        <div  style={ { display: "flex", justifyContent: 'center', flexWrap: "wrap" }}>
          {/* TODO: que este botón te lleve al vídeo explicativo */}
          <Link  type="button" className="gameButton" style={{ textDecoration: "none" }}>
            Bueno... 
          </Link>
          <Link to={"/preGame"} type="button" className="gameButton" style={{ textDecoration: "none" }}>
            Sí 
          </Link>
          <Link to={"/preGame"} type="button" className="gameButton" style={{ textDecoration: "none" }}>
            Tal vez 
          </Link>
        </div>
       
      </div>
    )
  }
}
