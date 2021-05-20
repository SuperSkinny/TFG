import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class GameComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            // modalOpen: false,
            classAnswer: "gameButton",
        }
      }


    handleOpen() {
        console.log("Modal accionado");
        this.setState({ 
          modalOpen: true, 
        }
        ,() => {setTimeout(() => this.handleClose(), 2000)}
        );
    };

    handleClose() {
        this.setState({ 
            classAnswer: "gameButton",
        });
    };

    handleResponse(answer) {
        console.log("Entra aquí?: "+ answer)
        if (answer === true) {
            console.log("Es correcta")
            this.setState({
                classAnswer: "gameButtonCorrect",
                },
                () => {setTimeout(() => this.handleClose(), 2000)}
            );
        } else {
            console.log("NO Es correcta")
            this.setState({
                classAnswer: "gameButtonFail"},
                () => {setTimeout(() => this.handleClose(), 2000)}
            ); 
        }
    }

    render() {
        const { gameModeQuestion, onGameGoBack, onResponsePress, lifeBar } = this.props;
        
        console.log(gameModeQuestion)
        if (!gameModeQuestion){
            return null;
        }
        
        
        

        return (
            <div style={ { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                
                <div>
                    <span className="generalTitle" >
                        {gameModeQuestion.question}
                    </span>
                </div>
                {/* {this.state.modalOpen && (
                    <div className="gameButton" style={{backgroundColor: "lightGreen", color: "white"}}>MAMARRACHOOOOO</div>
                ) } */}
                <div  style={ { display: "flex", justifyContent: 'center', flexWrap: "wrap" }}>
                    <button 
                        onClick={ ()=> {
                            onResponsePress(gameModeQuestion.answer1.correct, gameModeQuestion.question)
                            this.handleResponse(gameModeQuestion.answer1.correct)
                        }}
                        className={`${this.state.classAnswer}`}
                        // style={ !answerStyle ? { backgroundColor: "red" } : { backgroundColor: "green" }}
                    >
                        {gameModeQuestion.answer1.answer} 
                    </button>
                    <button
                        onClick={ ()=> {
                            onResponsePress(gameModeQuestion.answer2.correct, gameModeQuestion.question)
                            this.handleResponse(gameModeQuestion.answer2.correct)
                        }} 
                        className={`${this.state.classAnswer}`} 
                    >
                        {gameModeQuestion.answer2.answer}
                    </button>
                    <button
                        onClick={ ()=> {
                            onResponsePress(gameModeQuestion.answer3.correct, gameModeQuestion.question)
                            this.handleResponse(gameModeQuestion.answer3.correct)
                        }} 
                        className={`${this.state.classAnswer}`} 
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
