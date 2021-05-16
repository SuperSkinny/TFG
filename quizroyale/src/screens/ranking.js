import React, { Component } from 'react'

export default class Ranking extends Component {
  render() {
    return (
      <div  style={ { display: "flex", flexDirection: "column", alignItems: 'center' }}>
          <span className="generalTitle" >
              Ranking
          </span>

        <div style={ { display: "flex", flexWrap: "wrap", justifyContent: "center" }}>

          <div style={ { display: "flex", flexDirection: "column", alignItems: 'center' }}>
            <span className="cardTitle" style={{ marginTop: 10}}>
              Novato
            </span>          
            <div  className="tableResult">
                
              <div className="row">
                <div className="divPosition">
                  <span className="position">
                    1 
                  </span>
                </div>
                <span className="userName">
                  Guillermo Piñero
                </span>
                <span className="userPoints">
                  7635
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
                  765
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
                  635
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


          <div style={ { display: "flex", flexDirection: "column", alignItems: 'center' }}>
            <span className="cardTitle" style={{ marginTop: 10}}>
              Viciado
            </span>          
            <div  className="tableResult">
                
              <div className="row">
                <div className="divPosition">
                  <span className="position">
                    1 
                  </span>
                </div>
                <span className="userName">
                  Guillermo Piñero
                </span>
                <span className="userPoints">
                  7635
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
                  765
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
                  635
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

          <div style={ { display: "flex", flexDirection: "column", alignItems: 'center' }}>
            <span className="cardTitle" style={{ marginTop: 10}}>
              Hacker
            </span>          
            <div  className="tableResult">
                
              <div className="row">
                <div className="divPosition">
                  <span className="position">
                    1 
                  </span>
                </div>
                <span className="userName">
                  Guillermo Piñero
                </span>
                <span className="userPoints">
                  7635
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
                  765
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
                  635
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
          
        </div> 
      </div>
    )
  }
}
