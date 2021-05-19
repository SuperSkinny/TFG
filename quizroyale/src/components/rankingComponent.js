import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class RankingComponent extends Component {

    render() {
        const { scores } = this.props;

        if (!scores){
            return null;
        }

        return (
            <div style={ { display: "flex", flexDirection: "column", alignItems: 'center' }}>
                <span className="cardTitle" style={{ marginTop: 10}}>
                    { scores[0].category }
                </span>          
                <div  className="tableResult">
                    
                    <div className="row">
                        <div className="divPosition">
                        <span className="position">
                            1 
                        </span>
                        </div>
                        <span className="userName">
                            XD
                        </span>
                        <span className="userPoints">
                            { scores[0].score }
                        </span>
                    </div>
                    <div className="row">
                        <div className="divPosition">
                        <span className="position">
                            2 
                        </span>
                        </div>
                        <span className="userName">
                        Guillermo Piñero
                        </span>
                        <span className="userPoints">
                            { scores[1].score }
                        </span>
                    </div>
                    <div className="row">
                        <div className="divPosition">
                        <span className="position">
                            3 
                        </span>
                        </div>
                        <span className="userName">
                        Guillermo Piñero
                        </span>
                        <span className="userPoints" style={{display: "flex", alignSelf: "flex-end"}}>
                            { scores[2].score }
                        </span>
                    </div>
                    <div style={ { display: "flex", justifyContent: "center", alignItems: "center", height: 25 } }>
                        <span style={ { fontSize: 30 } }>···</span>
                    </div>
                    <div className="row">
                        <div className="divPosition">
                        <span className="position">
                            1234 
                        </span>
                        </div>
                        <span className="userName">
                        Juan Gallego
                        </span>
                        <span className="userPoints">
                        35
                        </span>
                    </div>
                </div>  
            </div>
        );
    }
}
