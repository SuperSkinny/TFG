import React, { Component } from 'react';
import * as model from '../api/model';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/styles.css';
import GameComponent from '../components/gameComponent';
import LoadScreen from '../components/loadScreen';
import PostGame from '../screens/postGame';

export default class Game extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            questions_answers: [],
            points: 0,
            gameStarted: false,
            gameEnded: false,
            spinner: true,
        }
    }
    
    async componentDidMount() {
        console.log("cuando entras aquí?")
        this.setState({questions_answers: await model.getAllQuestionsAndAnswersByCategory(this.props.gameModeName)})
        this.setState({spinner: false})
    }

    getRandomQuestionAndAnswers(questions_answers) {
        var randomQuestion = Math.floor(Math.random() * questions_answers.length)

        return questions_answers[randomQuestion]
    }

    handleGameStart() {
        this.setState({gameStarted: true})
    }

    handleResponse(question, currentPoints, lifeBar) {
        const { questions_answers } = this.state
        this.questions_answers = questions_answers.filter(deleteRandomQuestion => deleteRandomQuestion.question !== question)
        console.log('Barra vida: ' + lifeBar)
        setTimeout(() => {
            if (this.questions_answers.length === 0 || lifeBar <= 0) {
                console.log('No vida')
                this.setState({
                    gameStarted: false,
                    gameEnded: true,
                })
            } else {
                this.setState({
                    questions_answers: this.questions_answers,
                    points: currentPoints,
                })
            }
        }, 2000)
    }

    handleGameEnded() {
        this.setState({gameEnded: true})
    }

    
    
    render() {
        const { onGameGoBack, gameModeName, points } = this.props;
        const { questions_answers, gameStarted, gameEnded, spinner } = this.state;

        console.log('Primer render')

        const questionAndAnswers = this.getRandomQuestionAndAnswers(questions_answers)
        
        return (
        <React.Fragment>
            <div className="componentContent" >
                { spinner && (
                    <div className="spinner-grow text-secondary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    // <div className="spinner-border text-secondary" role="status">
                    //   <span className="sr-only">Loading...</span>
                    // </div>
                )}
                { !gameStarted && !gameEnded && !!questions_answers.length && (
                    <LoadScreen
                        handleGameStart={ () => this.handleGameStart()}
                    />
                )}
                { gameStarted && !gameEnded && (
                    <div>
                    {/* <div style={ { display: "flex", flexDirection: "column", alignItems: "center", marginRight: 20 }}>
                        <span className="cardTitle" style={ { marginBottom: 8 } }>Puntuación</span>
                        <div className="cardResult" >{points}</div>
                    </div> */}
                    <GameComponent
                        gameModeQuestion={questionAndAnswers}
                        // points={points}
                        // TODO: hay que resetear el juego aquí cuando salimos
                        onGameGoBack={onGameGoBack}
                        onResponsePress={ (question, points, lifeBar) => this.handleResponse(question, points, lifeBar)}
                    />
                    </div>
                )}
                { !gameStarted && gameEnded && (
                    <PostGame
                        gameModeName={gameModeName}
                        points={points}
                        onGameGoBack={onGameGoBack}
                    />
                )}
            </div>
        </React.Fragment>
        )
    }
}




