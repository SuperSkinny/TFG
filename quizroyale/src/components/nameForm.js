import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/styles/styles.css'

export default class nameForm extends Component {

    changeName(name) {
        const { changeValue } = this.props
        changeValue(name)
    }
    
    render() {
        const { points, userScore } = this.props
        return (
            <>
            {!userScore.length ? (
                <div  style={ { display: "flex", justifyContent: 'center' }}>
                    <span className="generalTitle" >
                        ¡Te has abierto paso en el ranking mundial!
                    </span>
                
                    <div style={ { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
                        <span className="cardTitle" style={ { marginBottom: 8 } }>Puntuación</span>
                        <div className="cardResult" >{points}</div>
                    </div>
                    <span  style={ {display: "flex", fontSize: 20, color: "#4F4F4F", textAlign: "center", justifyContent: 'center', marginBottom: 20 } }>
                        Para continuar introduce tu nombre y hazte un hueco en la tabla de puntuaciones.
                    </span>
                    
                    <div style={ { display: "flex", flexDirection: "column", alignItems: "center", marginRight: 20 }}>
                        <input className="cardResult" type="text" id="name" name="name" style={ { height: 40, width: 300, marginBottom: 20 }}/>
                        <button 
                            className="generalButton"
                            onClick={ () => {
                                this.changeName(document.getElementById('name').value)
                            }}
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            ) : (
                <div  style={ { display: "flex", justifyContent: 'center' }}>                   
                        <span className="generalTitle" >
                            ¡Has superado tu puntuacion anterior!
                        </span>
                    
                        <div style={ { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
                            <span className="cardTitle" style={ { marginBottom: 8 } }>Puntuación</span>
                            <div className="cardResult" >{points}</div>
                        </div>
                        <span  style={ {display: "flex", fontSize: 20, color: "#4F4F4F", textAlign: "center", justifyContent: 'center', marginBottom: 20 } }>
                            Continua con tu nombre anterior.
                        </span>
                        <button 
                            className="generalButton"
                            onClick={ () => {
                                this.changeName(userScore[0].name)
                            }}
                        >
                            {userScore[0].name} 
                        </button>
                        <span  style={ {display: "flex", fontSize: 20, color: "#4F4F4F", textAlign: "center", justifyContent: 'center', marginBottom: 20 } }>
                            O introduce un nombre nuevo.
                        </span>
                        
                        <div style={ { display: "flex", flexDirection: "column", alignItems: "center", marginRight: 20 }}>
                        <input className="cardResult" type="text" id="name" name="name" style={ { height: 40, width: 300, marginBottom: 20 }}/>
                        <button 
                            className="generalButton"
                            onClick={ () => {
                                this.changeName(document.getElementById('name').value)
                            }}
                        >
                            Guardar
                        </button>
                        </div>
                </div>
            )}
            </>
        )
    }
}