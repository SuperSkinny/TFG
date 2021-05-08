import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";

export default class GameComponent extends Component {


  render() {
    const { gameModeQuestion, onGameGoBack } = this.props;
    if (!gameModeQuestion){
        return null;
    }
    const { question, answer1, answer2, answer3 } = gameModeQuestion;
    
    // let answerStyle = false;

    // const handleResponse = (answer) => {
    //     if (answer === true) {
    //         this.answerStyle = true;
    //     }
    // }

    return (
        <div className="content" style={ { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div>
                <span className="generalTitle" >
                    {question}
                </span>
            </div>
            <div  style={ { display: "flex", justifyContent: 'center', flexWrap: "wrap" }}>
                <button 
                    onClick={ ()=> {
                        // handleResponse(answer1.valor)
                    }}
                    className="gameButton"
                    // style={ !answerStyle ? { backgroundColor: "red" } : { backgroundColor: "green" }}
                >
                    {answer1} 
                </button>
                <button className="gameButton" >
                    {answer2}
                </button>
                <button type="button"  className="gameButton">
                    {answer3}
                </button>
            </div>
            
            <div className="progressBarContainer">
                <div className="progressBar" style={{ width: "25%" }} ></div>
            </div>
            <div style={ { marginTop: 30 } }>
                <button 
                    type="button" 
                    className="generalButton"
                    onClick={ () => {
                        // TODO: hay que resetear el juego aquí cuando salimos
                        //console.log("SALIR A PREGAME")
                        onGameGoBack()
                    }}
                >
                    Salir
                </button>
            </div>
        </div>
    );
  }
}
