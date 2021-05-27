import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'firebase/auth'
import { useFirebaseApp } from 'reactfire'
import * as model from '../api/model';

export default class RankingComponent extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            scores: [],
            scoreOfUser: [],
        }
    }

    async componentDidMount() {
        this.setState({
            scores: await model.getBestThreeScoresOfACategory(this.props.gameModeName),
            scoreOfUser: await model.getScoreAndPositionOfUserByIdAndCategory(this.props.uid ,this.props.gameModeName)
        })
    }

    render() {
        const { scores, scoreOfUser } = this.state

        if (scoreOfUser.length !== 0)
            console.log('score of user: ', scoreOfUser)

        return (
            <>
            {!!scores.length && (
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
                            { scores[0].name }
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
                            { scores[1].name }
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
                            { scores[2].name }
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
                            { scoreOfUser[0].position }
                        </span>
                        </div>
                        <span className="userName">
                            { scoreOfUser[0].name }
                        </span>
                        <span className="userPoints">
                            { scoreOfUser[0].score }
                        </span>
                    </div>
                </div>  
            </div>
            )}
            </>
        );
    }
}
