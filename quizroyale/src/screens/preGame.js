import React, { Component, useState } from 'react';
import model from '../api/model'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/styles/styles.css'
import { Link } from "react-router-dom";

import GameModeComponent from '../components/gameModeComponent';
import Game from '../screens/game';

export default class PreGame extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      gameStarted: false, 
      gameMode: [], 
    };
  }

  async componentDidMount() {
    this.setState({gameMode: await model.getCategories()})
  }
  
  handleGameScreen = (gameModeName) => {
    this.setState({gameStarted: !this.gameStarted});
    this.setState({gameModeName: gameModeName});
  }

  render() {
    const { gameStarted, gameModeName, gameMode } = this.state

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
                {gameMode.map(({ category, description }) => 
                <GameModeComponent
                  key={category}
                  gameMode={category}
                  modeDescription={description}
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
            <div style={ {  } }>
              <Link 
                to={"/"}
                type="button" 
                className="playButton"
                style={ {  marginTop: 25, marginBottom: 30, maxWidth: 150, textDecoration: "none" } }
                // onClick={ () => {
                //   onPress()
                //   console.log("A JUGAR!")
                // }}
              >
                Salir
              </Link>
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






