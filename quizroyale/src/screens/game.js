import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/styles.css';
import GameComponent from '../components/gameComponent';

export default class Game extends Component {
  
  render() {
    
    const { gameModeName, onGameGoBack } = this.props;
    // console.log("GameMode en game Component: "+gameModeName)


    const easyMode = { question: "¿Por qué flotan los barcos?", answer1: "Por el principio de arquímedes", answer2: "Por el agua", answer3: "Porque sí"};
    const mediumMode = { question: "¿Cuál es el nombre del caballo del Brujero?", answer1: "Sardinilla", answer2: "Imperioso", answer3: "Rocinante"};
    const hardMode = { question: "¿Como se llama el hack que ves a través de las paredes?", answer1: "TransparentMode", answer2: "WallHack", answer3: "wallTransparent"};
    
    let gameModeObj;

    if(gameModeName === "Novato"){
      gameModeObj = easyMode;
    }else if (gameModeName === "Viciao"){
      gameModeObj = mediumMode;
    }else if (gameModeName === "Hacker"){
      gameModeObj = hardMode;
    }
    return (
      <React.Fragment>
        <GameComponent
          gameModeQuestion={gameModeObj}
          // TODO: hay que resetear el juego aquí cuando salimos
          onGameGoBack={onGameGoBack}
        />
      </React.Fragment>
    )
  }
}




