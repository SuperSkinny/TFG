import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
// import Countdown, { zeroPad } from 'react-countdown';
// import Countdown from './countdown';

export default class GameComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ifAnswer: false,
            points: 0,
            lifeBar: 100,
            gameOver: false,
            questionCount: 0,
            // countdownStart: true,
        }
      }

    handleRestart() {
        this.setState({ 
            ifAnswer: false,
            disabledButton: false,
            // countdownStart: true,
            // countdownStop: false,
        });
    };

    handleResponse(answer) {
        const { onResponsePress, gameModeQuestion, onGameEnded } = this.props
        const { lifeBar, points } = this.state
        
        this.setState({questionCount: this.state.questionCount +1});
        if ( lifeBar <= 25) {
            onGameEnded(this.state.points)
        } else {
            if (answer === true) {
                this.setState({ 
                    ifAnswer: true,
                    points: this.state.points + 1,
                    disabledButton: true,
                    // countdownStop: true,
                }, () => {
                    if (this.state.questionCount !== 20){
                        setTimeout(() => this.handleRestart(), 2000)
                    }
                })
            } else {
                this.setState({ 
                    ifAnswer: true,
                    disabledButton: true,
                    lifeBar: this.state.lifeBar - 25,
                    // countdownStop: true,
                }, () => {
                    if (this.state.questionCount !== 20){
                        setTimeout(() => this.handleRestart(), 2000)
                    }
                })
            }
            onResponsePress(gameModeQuestion.question, points)
        }    
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

    // handleTimeOut() {
    //     const { onResponsePress, gameModeQuestion, onGameEnded } = this.props;
    //     const { lifeBar, points } = this.state;

    //     if ( lifeBar <= 25) {
    //         onGameEnded(this.state.points)
    //     } else {
    //         this.setState({ 
    //             ifAnswer: true,
    //             disabledButton: true,
    //             lifeBar: this.state.lifeBar - 25,
    //             countdownStop: true,
    //         }, () => {setTimeout(() => this.handleRestart(), 2000)});
    //         onResponsePress(gameModeQuestion.question, points);
    //     }
    // }
    

    render() {
        const { gameModeQuestion, onGameGoBack } = this.props;
        
        if (!gameModeQuestion){
            return null;
        }
        
        return (
            <div className="columnContent">
                <div style={ { display: "flex", flexDirection: "column", alignItems: "center", marginRight: 20 }}>
                    <span className="cardTitle" style={ { marginBottom: 8 } }>Puntuación</span>
                    <div className="cardResult" >{this.state.points}</div>
                </div>
                {/* <div style={ { display: "flex", flexDirection: "row", marginBottom: 20 }}>
                    <div style={ { display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span className="cardTitle" style={ { marginBottom: 8 } }>Puntuación</span>
                        <div className="cardResult" >{this.state.points}</div>
                    </div>
                    <div style={ { display: "flex", flexDirection: "column", alignItems: "center", marginLeft: 20 }}>
                        <span className="cardTitle" style={ { marginBottom: 8 } }>Tiempo</span>
                        <div>
                            <countdownStop
                                onComplete={() => this.handleTimeOut()}
                                // autoStart={countdownStart}
                                // onStop={countdownStop}
                                date={Date.now() + 5000}
                                renderer={props => <div className="cardResult">{zeroPad(props.seconds, 1)}</div>}
                            />
                            
                        </div>
                    </div>
                </div> */}
                <div>
                    <span className="generalTitle" >
                        {gameModeQuestion.question}
                    </span>
                </div>
                <div  style={ { display: "flex", justifyContent: 'center', flexWrap: "wrap" }}>
                    <button 
                        onClick={ ()=> {
                            this.handleResponse(gameModeQuestion.answer1.correct);
                        }}
                        className={( this.state.ifAnswer ? `${this.handleAnswerOne()}` : "gameButton")}
                        disabled={this.state.disabledButton}
                    >
                        {gameModeQuestion.answer1.answer} 
                    </button>
                    <button
                        onClick={ ()=> {
                            this.handleResponse(gameModeQuestion.answer2.correct)
                        }} 
                        className={( this.state.ifAnswer ? `${this.handleAnswerTwo()}` : "gameButton")} 
                        disabled={this.state.disabledButton}
                    >
                        {gameModeQuestion.answer2.answer}
                    </button>
                    <button
                        onClick={ ()=> {
                            this.handleResponse(gameModeQuestion.answer3.correct)
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
