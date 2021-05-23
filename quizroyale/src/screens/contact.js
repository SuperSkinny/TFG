import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/styles/styles.css'
import * as model from '../api/model';


export default class Contact extends Component {
  render() {
    return (
      <div  style={ { display: "flex", justifyContent: 'center' }}>

        <div style={ { width: 700, marginLeft:14, marginRight: 14 }}>
          <div>
            <span className="generalTitle" >
              ¿Tienes alguna duda? ¡Contáctanos!
            </span>
          </div>
          <form>
          <div className="mb-3">
              
              <input 
                type="text" 
                className="form-control" 
                id="nameInput" 
                placeholder="Nombre"
                style={ { borderRadius: 15 }}  
              />
            </div>
            <div className="mb-3">
              {/* <label for="emailInput" className="form-label"></label> */}
              <input 
                type="email" 
                className="form-control" 
                id="emailInput" 
                placeholder="Correo electrónico"
                style={ { borderRadius: 15 }}  
              />
            </div>
            <div className="mb-3">
              {/* <label for="subjectInput" className="form-label"></label> */}
              <input 
                type="text" 
                className="form-control" 
                id="subjectInput" 
                placeholder="Asunto"
                style={ { borderRadius: 15 }}  
              />
            </div>
            <div className="mb-3">
              {/* <label for="exampleFormControlTextarea1" className="form-label">¡Tu mensaje!</label> */}
              <textarea 
                className="form-control" 
                id="exampleFormControlTextarea1" 
                rows="5"
                placeholder="Cuéntanos qué te aflije..."
                style={ { borderRadius: 15 }}
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="generalButton"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    )
  }
}
