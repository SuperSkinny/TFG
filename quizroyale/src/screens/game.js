import React, { Component } from 'react';
import model from '../api/model'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/styles.css';
import GameComponent from '../components/gameComponent';

export default class Game extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      questions_answers: [], 
    }
  }

  async componentDidMount() {
    this.setState({questions_answers: await model.getAllQuestionsAndAnswersByCategory(this.props.gameModeName)})
  }

  logicForQuestionsAndAnswers(questions_answers) {
    var randomQuestion = Math.floor(Math.random() * questions_answers.length)
    // let questions = questions_answers.map(x => Object.keys(x)[0])

    // console.log(questions_answers[randomQuestion])

    // var questionAndAnswers = {}
    // questionAndAnswers[questions[randomQuestion]] = questions_answers[randomQuestion]
    // console.log('Pregunta y respuestas obtenidas: ', questionAndAnswers)
  
    // console.log('? ', questions_answers[randomQuestion])
    // questions_answers.splice(randomQuestion, 1)
    // console.log('Array sin esa pregunta: ', questions_answers)
    return questions_answers[randomQuestion]

  }

  render() {
    const { gameModeName, onGameGoBack } = this.props;
    const { questions_answers } = this.state;

    var questionAndAnswers

    if (questions_answers.length !== 0) {
      questionAndAnswers = this.logicForQuestionsAndAnswers(questions_answers)
    }

    // console.log("GameMode en game Component: " + gameModeName)
    // console.log('Preguntas y respuestas: ', questions_answers[1])

    return (
      <React.Fragment>
        <GameComponent
          gameModeQuestion={questionAndAnswers}
          // TODO: hay que resetear el juego aquí cuando salimos
          onGameGoBack={onGameGoBack}
        />
      </React.Fragment>
    )
  }
}




