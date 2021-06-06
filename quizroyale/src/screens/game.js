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
            // points: 0,
            gameStarted: false,
            gameEnded: false,
            spinner: true,
        }
    }
    
    async componentDidMount() {
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

    handleResponse(question, currentPoints) {
        const { questions_answers } = this.state
        // console.log('PUNTOS ACTUALES: ' + currentPoints)
        // console.log('VIDA ACTUAL: ' + lifeBar)
        this.questions_answers = questions_answers.filter(deleteRandomQuestion => deleteRandomQuestion.question !== question)

        setTimeout(() => {
            if (this.questions_answers.length === 0) {
                this.handleGameEnded(currentPoints)
            } else {
                this.setState({
                    // points: currentPoints,
                    questions_answers: this.questions_answers,
                })
            }
        }, 2000)
    }

    handleGameEnded(currentPoints) {
        this.setState({
            gameStarted: false,
            gameEnded: true,
            points: currentPoints
        })
    }
    
    render() {
        const { onGameGoBack, gameModeName } = this.props;
        const { questions_answers, points, gameStarted, gameEnded, spinner } = this.state;

        const questionAndAnswers = this.getRandomQuestionAndAnswers(questions_answers)
        
        return (
        <React.Fragment>
            <div className="componentContent" >
                { spinner && (
                    <div className="content" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <div className="spinner-grow text-secondary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
                { !gameStarted && !gameEnded && !!questions_answers.length && (
                    <LoadScreen
                        handleGameStart={ () => this.handleGameStart() }
                    />
                )}
                { gameStarted && !gameEnded && (
                    <GameComponent
                        gameModeQuestion={questionAndAnswers}
                        // points={points}
                        // TODO: hay que resetear el juego aquí cuando salimos
                        
                        onGameGoBack={onGameGoBack}
                        onResponsePress={ (question, currentPoints) => this.handleResponse(question, currentPoints) }
                        onGameEnded={ (currentPoints) => this.handleGameEnded(currentPoints) }
                    />
                )}
                { !gameStarted && gameEnded && (
                    <PostGame
                        gameModeName={gameModeName}
                        points={points}
                        uid={this.props.uid}
                        onGameGoBack={onGameGoBack}
                    />
                )}
            </div>
        </React.Fragment>
        )
    }
}




