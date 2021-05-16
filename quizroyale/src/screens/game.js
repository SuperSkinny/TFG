import React, { Component } from 'react';
import model from '../api/model'
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
      lifeBar: 100,
      gameStarted: false,
      gameEnded: false,
    }
  }
  
  async componentDidMount() {
    this.setState({questions_answers: await model.getAllQuestionsAndAnswersByCategory(this.props.gameModeName)})
  }

  getRandomQuestionAndAnswers(questions_answers) {
    var randomQuestion = Math.floor(Math.random() * questions_answers.length)

    return questions_answers[randomQuestion]
  }

  handleGameStart() {
    console.log('Handle game start')
    // for(var i = 0; i < 5; i++) {
    //   console.log('Contador: ' + i)
    // }

    this.setState({gameStarted: true})
  }

  handleResponse(answer, question) {
    const { questions_answers, lifeBar } = this.state
    this.questions_answers = questions_answers.filter(deleteRandomQuestion => deleteRandomQuestion.question !== question)

    if (answer === true) {
      if (this.questions_answers.length === 0) {
        this.setState({
          points: this.state.points + 1,
          gameStarted: false,
          gameEnded: true,
        })
      } else {
        this.setState({
          questions_answers: this.questions_answers,
          points: this.state.points + 1
        })
      }
    } else {
      if (this.questions_answers.length === 0) {
        this.setState({
          lifeBar: this.state.lifeBar - 100,
          gameStarted: false,
          gameEnded: true,
        })
      } else {
        this.setState({
          questions_answers: this.questions_answers,
          lifeBar: this.state.lifeBar - 100
        })
      }
    }
  }

  handleGameEnded() {
    this.setState({gameEnded: true})
  }
  
  render() {
    const { onGameGoBack, gameModeName } = this.props;
    const { questions_answers, points, gameStarted, gameEnded, lifeBar } = this.state;

    console.log('Primer render')
    // if(!gameStarted) {
    //   this.handleGameStart()
    //   return null
    // }
    console.log('Despues de gameStarted')
    
    // if(gameStarted && questions_answers.length === 0) {
    //   this.handleGameEnded()
    // }

    const questionAndAnswers = this.getRandomQuestionAndAnswers(questions_answers)

    // console.log("GameMode en game Component: " + gameModeName)
    // console.log('Preguntas y respuestas: ', questions_answers[1])

    return (
      <React.Fragment>
        <div>
          { !gameStarted && !gameEnded && !!questions_answers.length && (
            <LoadScreen
              handleGameStart={ () => this.handleGameStart()}
            />
          )}
          { gameStarted && !gameEnded  && (
            <div>
              <div>
                Puntuacion:
                {points}
              </div>
              <GameComponent
                gameModeQuestion={questionAndAnswers}
                lifeBar={lifeBar}
                // TODO: hay que resetear el juego aquí cuando salimos
                onGameGoBack={onGameGoBack}
                onResponsePress={ (answer, question) => this.handleResponse(answer, question)}
              />
            </div>
          )}
          { !gameStarted && gameEnded && (
            <PostGame
              gameModeName={gameModeName}
              points={points}
            />
          )}
        </div>
      </React.Fragment>
    )
  }
}




