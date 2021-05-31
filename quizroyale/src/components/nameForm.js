import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/styles/styles.css'

export default  class FormView extends Component {

    handleChange(e){
        e.preventDefault()

        this.props.changeValue(
        e.target.name.value,
        )
    }

    render() {

        return (
        <div  style={ { display: "flex", justifyContent: 'center' }}>
            <form onSubmit={this.handleChange.bind(this)}>
            
                <span className="generalTitle" >
                    ¡Te has abierto paso en el ranking mundial!
                </span>
            
                <div style={ { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
                    <span className="cardTitle" style={ { marginBottom: 8 } }>Puntuación</span>
                    <div className="cardResult" >{this.props.points}</div>
                </div>
                <span  style={ {display: "flex", fontSize: 20, color: "#4F4F4F", textAlign: "center", justifyContent: 'center', marginBottom: 20 } }>
                    Para continuar introduce tu nombre y hazte un hueco en la tabla de puntuaciones.
                </span>
                
                <div style={ { display: "flex", flexDirection: "column", alignItems: "center", marginRight: 20 }}>
                    <input className="cardResult" type="text" name="name" style={ { height: 40, width: 300, marginBottom: 20 }}  />
                    <input className="generalButton" type="submit" value="Guardar" />
                </div>
            </form>
        </div>
        )
    }
}