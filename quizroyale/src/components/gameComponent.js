import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import Countdown from 'react-countdown';

export default class GameComponent extends Component {

    render() {
        const { gameModeQuestion, onGameGoBack, onResponsePress, lifeBar } = this.props;
        console.log(gameModeQuestion)
        if (!gameModeQuestion){
            return null;
        }

        // const { question } = gameModeQuestion;
        
        // let answerStyle = false;

        return (
            <div className="content" style={ { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <div>
                    <Countdown></Countdown>
                </div>
                <div>
                    <span className="generalTitle" >
                        {gameModeQuestion.question}
                    </span>
                </div>
                <div  style={ { display: "flex", justifyContent: 'center', flexWrap: "wrap" }}>
                    <button 
                        onClick={ ()=> {
                            onResponsePress(gameModeQuestion.answer1.correct, gameModeQuestion.question)
                        }}
                        className="gameButton"
                        // style={ !answerStyle ? { backgroundColor: "red" } : { backgroundColor: "green" }}
                    >
                        {gameModeQuestion.answer1.answer} 
                    </button>
                    <button
                        onClick={ ()=> {
                            onResponsePress(gameModeQuestion.answer2.correct, gameModeQuestion.question)
                        }} 
                        className="gameButton" 
                    >
                        {gameModeQuestion.answer2.answer}
                    </button>
                    <button
                        onClick={ ()=> {
                            onResponsePress(gameModeQuestion.answer3.correct, gameModeQuestion.question)
                        }} 
                        className="gameButton" 
                    >
                        {gameModeQuestion.answer3.answer}
                    </button>
                </div>
                
                <div className="progressBarContainer">
                    <div className="progressBar" style={{ width: `${lifeBar}%` }} ></div>
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
