import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class GameComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ifAnswer: false,
            points: 0,
            lifeBar: 100,
        }
      }

    handleRestart() {
        this.setState({ 
            ifAnswer: false,
            disabledButton: false,
        });
    };

<<<<<<< HEAD
    handleResponse(answer) {
=======
    // handleResponse(answer) {
    //     console.log("Entra aquí?: "+ answer)
    //     if (answer === true) {
    //         console.log("Es correcta")
    //         this.setState({
    //             classAnswer: "gameButtonCorrect",
    //             },
    //             () => {setTimeout(() => this.handleClose(), 2000)}
    //         );
    //     } else {
    //         console.log("NO Es correcta")
    //         this.setState({
    //             classAnswer: "gameButtonFail"},
    //             () => {setTimeout(() => this.handleClose(), 2000)}
    //         ); 
    //     }
    // }

    handleResponse(answer) {
        const { onResponsePress, gameModeQuestion } = this.props
        console.log('Aqui se resta vida o se suma puntos')
>>>>>>> f3466a5e0e76d3dd83d8bdbecab47f1b63606edc
        if (answer === true) {
            this.setState({ 
                ifAnswer: true,
                points: this.state.points + 1,
                disabledButton: true,
            }, () => {setTimeout(() => this.handleRestart(), 2000)})
        } else {
            console.log("respuesta incorrecta")
            this.setState({ 
                ifAnswer: true,
<<<<<<< HEAD
                disabledButton: true,
=======
                lifeBar: this.state.lifeBar - 25,
>>>>>>> f3466a5e0e76d3dd83d8bdbecab47f1b63606edc
            }, () => {setTimeout(() => this.handleRestart(), 2000)})
        }
        onResponsePress(gameModeQuestion.question, this.state.points, this.state.lifeBar)
    }

    handleAnswerOne() {
        const {gameModeQuestion} = this.props;
        if (gameModeQuestion.answer1.correct === true) {
            return "gameButtonCorrect"
        } else  {
            return "gameButtonFail"
        } 
    }

    handleAnswerTwo() {
        const {gameModeQuestion} = this.props;
        if (gameModeQuestion.answer2.correct === true) {
            return "gameButtonCorrect"
        } else  {
            return "gameButtonFail"
        } 
    }

    handleAnswerThree() {
        const {gameModeQuestion} = this.props;
        if (gameModeQuestion.answer3.correct === true) {
            return "gameButtonCorrect"
        } else  {
            return "gameButtonFail"
        } 
    }

    render() {
        const { gameModeQuestion, onGameGoBack, onResponsePress } = this.props;
        
        console.log(gameModeQuestion)
        if (!gameModeQuestion){
            return null;
        }
        
        return (
            <div className="columnContent">
                <div style={ { display: "flex", flexDirection: "column", alignItems: "center", marginRight: 20 }}>
                    <span className="cardTitle" style={ { marginBottom: 8 } }>Puntuación</span>
                    <div className="cardResult" >{this.state.points}</div>
                </div>
                <div>
                    <span className="generalTitle" >
                        {gameModeQuestion.question}
                    </span>
                </div>
                <div  style={ { display: "flex", justifyContent: 'center', flexWrap: "wrap" }}>
                    <button 
                        onClick={ ()=> {
<<<<<<< HEAD
                            onResponsePress(gameModeQuestion.answer1.correct, gameModeQuestion.question);
                            this.handleResponse(gameModeQuestion.answer1.correct);
=======
                            this.handleResponse(gameModeQuestion.answer1.correct)
                            // this.handleResponse(gameModeQuestion.answer1.correct)
>>>>>>> f3466a5e0e76d3dd83d8bdbecab47f1b63606edc
                        }}
                        className={( this.state.ifAnswer ? `${this.handleAnswerOne()}` : "gameButton")}
                        disabled={this.state.disabledButton}
                    >
                        {gameModeQuestion.answer1.answer} 
                    </button>
                    <button
                        onClick={ ()=> {
<<<<<<< HEAD
                            onResponsePress(gameModeQuestion.answer2.correct, gameModeQuestion.question);
                            this.handleResponse(gameModeQuestion.answer2.correct);
                        }}
=======
                            onResponsePress(gameModeQuestion.answer2.correct, gameModeQuestion.question, this.state.lifeBar)
                            // this.handleResponse(gameModeQuestion.answer2.correct)
                            this.handleResponse(gameModeQuestion.answer2.correct)
                        }} 
                        // className={`${this.state.classAnswer}`}
>>>>>>> f3466a5e0e76d3dd83d8bdbecab47f1b63606edc
                        className={( this.state.ifAnswer ? `${this.handleAnswerTwo()}` : "gameButton")} 
                        disabled={this.state.disabledButton}
                    >
                        {gameModeQuestion.answer2.answer}
                    </button>
                    <button
                        onClick={ ()=> {
<<<<<<< HEAD
                            onResponsePress(gameModeQuestion.answer3.correct, gameModeQuestion.question);
                            this.handleResponse(gameModeQuestion.answer3.correct);
=======
                            onResponsePress(gameModeQuestion.answer3.correct, gameModeQuestion.question, this.state.lifeBar)
                            // this.handleResponse(gameModeQuestion.answer3.correct)
                            this.handleResponse(gameModeQuestion.answer3.correct)
>>>>>>> f3466a5e0e76d3dd83d8bdbecab47f1b63606edc
                        }} 
                        className={( this.state.ifAnswer ? `${this.handleAnswerThree()}` : "gameButton")}
                        disabled={this.state.disabledButton} 
                    >
                        {gameModeQuestion.answer3.answer}
                    </button>
                </div>
                
                <div className="progressBarContainer">
                    <div className="progressBar" style={{ width: `${this.state.lifeBar}%` }} ></div>
                </div>
                <div style={ { marginTop: 30, marginBottom: 30 } }>
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
