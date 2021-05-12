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
      points: 0,
      lifeBar: 100,
      gameEnded: false,
    }
  }
  
  async componentDidMount() {
    console.log('Entro a did mount')
    this.setState({questions_answers: await model.getAllQuestionsAndAnswersByCategory(this.props.gameModeName)})
  }
  
  // componentDidUpdate(prevProps) {
  //   if(this.props.questions_answers !== prevProps.questions_answers) {
  //     this.logicForQuestionsAndAnswers(prevProps.questions_answers)
  //   }
  // }

  getRandomQuestionAndAnswers(questions_answers) {
    var randomQuestion = Math.floor(Math.random() * questions_answers.length)

    return questions_answers[randomQuestion]
  }

  handleResponse(answer, question) {
    const { questions_answers } = this.state
    this.questions_answers = questions_answers.filter(deleteRandomQuestion => deleteRandomQuestion.question !== question)

    if (answer === true) {
      this.setState({
        questions_answers: this.questions_answers,
        points: this.state.points + 1
      })
    } else {
      this.setState({
        questions_answers: this.questions_answers,
        lifeBar: this.state.lifeBar - 25
      })
    }
  }

  render() {
    const { onGameGoBack } = this.props;
    const { questions_answers, points, gameEnded } = this.state;

    if(questions_answers.length === 0) {
      console.log('Entrada a null')
      return null
    }

    const questionAndAnswers = this.getRandomQuestionAndAnswers(questions_answers)

    // console.log("GameMode en game Component: " + gameModeName)
    // console.log('Preguntas y respuestas: ', questions_answers[1])

    return (
      <React.Fragment>
        {!gameEnded ? (
        <div>
          <div>
            Hola
            {points}
          </div>
          <GameComponent
            gameModeQuestion={questionAndAnswers}
            // TODO: hay que resetear el juego aquí cuando salimos
            onGameGoBack={onGameGoBack}
            onResponsePress={ (answer, question) => this.handleResponse(answer, question)}
          />
        </div>
        ) : (<div>Se ha acabado</div>) 
        }
        
      </React.Fragment>
    )
  }
}




