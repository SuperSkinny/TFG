import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class GameModeComponent extends Component {
  render() {
    const { gameMode, modeDescription, onGameModeButtonPress } = this.props;
    return (
    <div className="preGameCard" >
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <span className="cardTitle">{ gameMode }</span>
            <p>{ modeDescription }</p>
        </div>
        
            <button 
                style={{ alignSelf: 'flex-end'}}
                onClick={() => {
                    onGameModeButtonPress(gameMode);
                }}
                type="button" 
                className="generalButton"
            >
                Jugar
            </button>
        
    </div>
    );
  }
}
