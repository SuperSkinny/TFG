import React, { Component, useState } from 'react';
import model from '../api/model'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/styles/styles.css'

import GameModeComponent from '../components/gameModeComponent';
import Game from '../screens/game';

export default class PreGame extends Component {
  constructor(props) {
    super(props);
    this.state = { gameStarted: false };
  }

  // componentDidMount() {
  //   const gameMode = model.getCategories()
  //   console.log(gameMode)
  // }

  // gameMode = model.getCategories()
  // .then(response => {
  //   response.forEach(category => {
  //     console.log(category)
  //   })
  // })

  gameMode = [
    { name: "Novato", text: "Selección de preguntas fáciles para echar unas risas con tus coleguitas..." },
    { name: "Viciao", text: "Selección de preguntas moderadas para ver si eres el listo de tu grupo de amigos..." },
    { name: "Hacker", text: "Selección de preguntas para frustrarte y dejar de tener amigos si juegas con ellos." },
  ]
  
  handleGameScreen = (gameModeName) => {
    this.setState({gameStarted: !this.gameStarted});
    this.setState({gameModeName: gameModeName});
    // this.gameModeName = gameModeName;
    // console.log("Dificultad: "+gameModeName)
    // console.log("HandleGame:"+gameStarted)
  }

  render() {
    const { gameStarted, gameModeName } = this.state

    return (
      <React.Fragment>
        {!gameStarted ? (
          <div className="content" style={ { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center' }}>  
            <div>
              <span className="generalTitle" >
                Elije dificultad
              </span>
            </div>
            <div  style={ { display: "flex", justifyContent: 'center', flexWrap: "wrap" }}>
              <React.Fragment>
                {this.gameMode.map(({ name, text }) => 
                <GameModeComponent
                  key={name}
                  gameMode={name}
                  modeDescription={text}
                  onGameModeButtonPress={(gameModeName) => {this.handleGameScreen(gameModeName)}}
                />
                )}
              </React.Fragment>
              
            </div>
            <div>
              <span className="generalTitle" >
                La suerte sonrie a los valientes...
              </span>
            </div>
          </div>
        ) : (
          <Game 
            gameModeName={gameModeName}
            // TODO: hay que resetear el juego aquí cuando salimos
            onGameGoBack={() => {this.setState({gameStarted: !gameStarted})}}
          />
        )}
      </React.Fragment>
    )
  }
}






