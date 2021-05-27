import React, { Component } from 'react';
import RankingComponent from '../components/rankingComponent';

export default class Ranking extends Component {

    constructor(props) {
        super(props);
    }

  render() {

    return (
        <div  style={ { display: "flex", flexDirection: "column", alignItems: 'center' }}>
                <span className="generalTitle" >
                    Ranking
                </span>

            <div style={ { display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                <RankingComponent
                    gameModeName={'Novato'}
                    uid={this.props.user.uid}
                />
                <RankingComponent
                    gameModeName={'Viciado'}
                    uid={this.props.user.uid}
                />
                <RankingComponent
                    gameModeName={'Hacker'}
                    uid={this.props.user.uid}
                />
            </div> 
        </div>
    )
  }
}
