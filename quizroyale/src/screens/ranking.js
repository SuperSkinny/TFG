import React, { Component } from 'react';
import RankingComponent from '../components/rankingComponent';

export default class Ranking extends Component {
  render() {
    return (
        <div  style={ { display: "flex", flexDirection: "column", alignItems: 'center' }}>
                <span className="generalTitle" >
                    Ranking
                </span>

            <div style={ { display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                <RankingComponent
                    category={"Novato"}
                />
                <RankingComponent
                    category={"Viciado"}
                />
                <RankingComponent
                    category={"Hacker"}
                />
            </div> 
        </div>
    )
  }
}
