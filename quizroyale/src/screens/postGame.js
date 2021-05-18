import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/styles/styles.css'
import RankingComponent from '../components/rankingComponent';


export default class PostGame extends Component {

    
    render() {
        const { gameModeName, points, onGameGoBack } = this.props
        let msg;
        if ( points <= 1 ) {
            msg = "Para ser un novato no lo has hecho nada mal..."
        }else{
            msg = "Enhorabuena! Has roto el marcador!"
        }

        return (
            <div  style={ { display: "flex", justifyContent: 'center' }}>

                <div style={ { display: "flex", flexDirection: "column", alignItems: "center", width: 700, marginLeft:14, marginRight: 14 }}>
                    <div>
                        <span className="generalTitle" >
                            {msg}
                        </span>
                    </div>
                    <div style={ { display: "flex", flexDirection: "row", marginBottom: 20 }}>
                        <div style={ { display: "flex", flexDirection: "column", alignItems: "center", marginRight: 20 }}>
                            <span className="cardTitle" style={ { marginBottom: 8 } }>Puntuación</span>
                            <div className="cardResult" >{points}</div>
                        </div>
                        <div style={ { display: "flex", flexDirection: "column", alignItems: "center", marginLeft: 20 }}>
                            <span className="cardTitle" style={ { marginBottom: 8 } }>Tiempo</span>
                            <div className="cardResult" >34.5</div>
                        </div>
                    </div>   
                    <RankingComponent
                        category={gameModeName}
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
        )
    }
}