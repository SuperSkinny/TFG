import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/styles/styles.css'
import { Link } from "react-router-dom";


export default class Home extends Component {
  
  render() {
    const { onPress } = this.props;
    
    return (
      <div className="columnContent" >
        <span className="homeTitle" >¿Cuánto crees que sabes?</span>
        <span style={ { fontSize: 20, color: "#4F4F4F", textAlign: "center" } }>Compruébalo y deja tu marca en el ranking mundial.</span>
        <Link 
          to={"/preGame"}
          type="button" 
          className="playButton"
          style={ {  marginTop: 25, marginBottom: 30, maxWidth: 150, textDecoration: "none" } }
          // onClick={ () => {
          //   onPress()
          //   console.log("A JUGAR!")
          // }}
        >
          Jugar
        </Link>
      </div>
    )
  }
}
