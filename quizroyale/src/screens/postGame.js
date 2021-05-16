import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/styles/styles.css'


export default class PostGame extends Component {
  render() {
    const { gameModeName, points } = this.props

    return (
      <div  style={ { display: "flex", justifyContent: 'center' }}>

        <div style={ { display: "flex", flexDirection: "column", alignItems: "center", width: 700, marginLeft:14, marginRight: 14 }}>
          <div>
            <span className="generalTitle" >
                Para ser un novato no lo has hecho nada mal...
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
            </div>
          
          </div>

            
        </div> 
          
        
      </div>
    )
  }
}

/* <div  className="tableResult">
  <table>
    <tbody>
      <tr>
        <td id={"position"}>
          1 
        </td>
        <td id={"userName"}>
          Guillermo Piñero
        </td>
      </tr>
      <tr>
        <td id={"position"}>
          1 
        </td>
        <td id={"userName"}>
          Guillermo Piñero
        </td>
      </tr>
      <tr>
        <td id={"position"}>
          1 
        </td>
        <td id={"userName"}>
          Guillermo Piñero
        </td>
      </tr>
      <tr >
        <td colSpan={2} style={ { paddingLeft: 0, paddingRight: 0 } }>
          <span style={ { display: "flex", justifyContent: "center" } }>···</span> 
        </td>
      </tr>
      <tr>
        <td id={"position"}>
          1 
        </td>
        <td id={"userName"}>
          Guillermo Piñero
        </td>
      </tr>
    </tbody>
  </table>
</div>*/