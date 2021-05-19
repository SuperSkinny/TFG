import React, { Component } from 'react';
import RankingComponent from '../components/rankingComponent';
import model from '../api/model';

export default class Ranking extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      novatoScores: [],
      viciadoScores: [],
      hackerScores: [],
    }
  }

  async componentDidMount() {
      this.setState({
        novatoScores: await model.getBestThreeScoresOfACategory('Novato'),
        viciadoScores: await model.getBestThreeScoresOfACategory('Viciado'),
        hackerScores: await model.getBestThreeScoresOfACategory('Hacker'),
      })
  }

  render() {
    const { novatoScores, viciadoScores, hackerScores } = this.state;

    return (
      <div>
        {!!novatoScores.length && !!viciadoScores.length && !!hackerScores.length && (
        <div  style={ { display: "flex", flexDirection: "column", alignItems: 'center' }}>
                <span className="generalTitle" >
                    Ranking
                </span>

            <div style={ { display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                <RankingComponent
                    scores={novatoScores}
                />
                <RankingComponent
                    scores={viciadoScores}
                />
                <RankingComponent
                    scores={hackerScores}
                />
            </div> 
        </div>
      )}
      </div>
    )
  }
}
