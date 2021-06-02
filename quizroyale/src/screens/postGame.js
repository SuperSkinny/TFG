import React, { Component } from 'react';
import * as model from '../api/model';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/styles/styles.css'
import RankingComponent from '../components/rankingComponent';
import NameForm from '../components/nameForm';

export default class PostGame extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            userScore: [],
        }
    }

    async componentDidMount() {
        this.setState({userScore: await model.getScoreAndPositionOfUserByIdAndCategory(this.props.uid, this.props.gameModeName)});
    }

    changeValue(name) {
        model.setNewScore(this.props.uid, this.props.points, name, this.props.gameModeName);
    }
    
    render() {
        const { gameModeName, points, uid, onGameGoBack } = this.props;
        const { userScore } = this.state;
        
        let msg;
        if ( points <= 7 ) {
            msg = "Más suerte la próxima vez, si te atreves...";
        } else if ( points > 7 && points <= 14) {
            msg = "Para ser un novato no lo has hecho nada mal...";
        } else if ( points > 14 ) {
            msg = "Enhorabuena! Has roto el marcador!";
        }

        return (
            <>
            {!userScore.length || (userScore[0].score < points) ? (
                <NameForm
                    points={points}
                    changeValue={ this.changeValue.bind(this) }
                />
            ) : (
                <>
                <div  style={ { display: "flex", justifyContent: 'center' }}>
                    <div style={ { display: "flex", flexDirection: "column", alignItems: "center", width: 700, marginLeft:14, marginRight: 14 }}>
                        <div>
                            <span className="generalTitle" >
                                { msg }
                            </span>
                        </div>
                        <div style={ { display: "flex", flexDirection: "row", marginBottom: 20 }}>
                            <div style={ { display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <span className="cardTitle" style={ { marginBottom: 8 } }>Puntuación</span>
                                <div className="cardResult" >{points}</div>
                            </div>
                            {/* <div style={ { display: "flex", flexDirection: "column", alignItems: "center", marginLeft: 20 }}>
                                <span className="cardTitle" style={ { marginBottom: 8 } }>Tiempo</span>
                                <div className="cardResult" >34.5</div>
                            </div> */}
                        </div>
                        <RankingComponent
                            gameModeName={gameModeName}
                            uid={uid}
                        />
                        <div style={ { marginTop: 30 } }>
                        <button 
                            type="button" 
                            className="generalButton"
                            onClick={ () => {
                                // TODO: hay que resetear el juego aquí cuando salimos
                                //console.log("SALIR A PREGAME")
                                onGameGoBack()
                            }}
                        >
                            Salir
                        </button>
                    </div> 
                    </div>
                </div>
                </>
                )
            }
            </>
        )
    }
}