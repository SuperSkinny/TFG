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
  
  render() {
    const { gameModeName, onGameGoBack } = this.props;
    const { questions_answers } = this.state;
    console.log("GameMode en game Component: " + gameModeName)
    console.log('Preguntas y respuestas: ' + questions_answers)

    return (
      <React.Fragment>
        <GameComponent
          gameModeQuestion={questions_answers}
          // TODO: hay que resetear el juego aquí cuando salimos
          onGameGoBack={onGameGoBack}
        />
      </React.Fragment>
    )
  }
}




