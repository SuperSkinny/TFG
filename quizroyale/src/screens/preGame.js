import React, { Component, useState } from 'react';
import * as model from '../api/model';
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
        // gameMode: [], 
        };
    }

    async componentDidMount() {
        // this.setState({gameMode: await model.getCategories()})
    }
    
    handleGameScreen = (gameModeName) => {
        this.setState({gameStarted: !this.gameStarted});
        this.setState({gameModeName: gameModeName});
    }

    handleText() {
        var texts = [ "La suerte sonríe a los valientes...", "Igual no deberías...", "¡Inténtalo si te atreves!", "Nunca digas nunca, pero...", "Siempre te quedará PHP"]
        var randomText = Math.floor(Math.random() * texts.length)
        return texts[randomText]
    }

    render() {
        const { gameStarted, gameModeName } = this.state
        const gameMode = [ 
            { category: "Novato", description: "Selección de preguntas fáciles para echar unas risas con tus coleguitas..." },
            { category: "Viciado", description: "Selección de preguntas moderadas para ver si eres el listo de tu grupo de amigos..." },
            { category: "Hacker", description: "Selección de preguntas para frustrarte y dejar de tener amigos si juegas con ellos." },
        ]

        return (
        <React.Fragment>
            {!gameStarted ? (
                <div className="columnContent">  
                    <div>
                        <span className="generalTitle" >
                            Elije dificultad
                        </span>
                    </div>
                    <div  style={ { display: "flex", justifyContent: 'center', flexWrap: "wrap" }}>
                        {gameMode.map(({ category, description }) => 
                            <GameModeComponent
                                key={category}
                                gameMode={category}
                                modeDescription={description}
                                onGameModeButtonPress={(gameModeName) => {this.handleGameScreen(gameModeName)}}
                            />
                        )}
                    </div>
                    <div>
                    <span className="generalTitle" >
                        {this.handleText()}
                    </span>
                    </div>
                    <div style={ {  } }>
                        <Link 
                            to={"/"}
                            type="button" 
                            className="playButton"
                            style={ {  marginTop: 25, marginBottom: 30, maxWidth: 150, textDecoration: "none" } }
                        >
                            Salir
                        </Link>
                    </div>
                </div>
            ) : (
                <Game 
                    gameModeName={gameModeName}
                    uid={this.props.user.uid}
                    // TODO: hay que resetear el juego aquí cuando salimos
                    onGameGoBack={() => {this.setState({gameStarted: !gameStarted})}}
                />
            )}
        </React.Fragment>
        )
    }
}






