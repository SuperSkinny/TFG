import React, { Component } from 'react';

export default  class FormView extends Component {

  constructor(props) {
    super(props)
  }

  handleChange(e){
    e.preventDefault()

    this.props.changeValue(
      e.target.name.value,
    )
  }

  render() {

    return (
      <div  style={ { display: "flex", justifyContent: 'center' }}>
        <form onSubmit={this.handleChange.bind(this)}>
          <div>
            <span className="generalTitle" >
                ¡Te has abierto paso en el ranking mundial!
            </span>
          </div>
          <div>
            <span className="generalTitle" >
                Para continuar introduce tu nombre y hazte un hueco en la tabla de puntuaciones.
            </span>
          </div>
          <div style={ { display: "flex", flexDirection: "column", alignItems: "center", marginRight: 20 }}>
            <span className="cardTitle" style={ { marginBottom: 8 } }>Puntuación</span>
            <div className="cardResult" >{this.props.points}</div>
          </div>
          <br></br>
          <div style={ { display: "flex", flexDirection: "column", alignItems: "center", marginRight: 20 }}>
            <input type="text" name="name" />
            <input type="submit" value="Guardar" />
          </div>
        </form>
      </div>
    )
  }
}