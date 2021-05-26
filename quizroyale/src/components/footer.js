import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Footer extends Component {
  render() {
    return (
      <footer className="text-center text-lg-start">
        <div className="text-center pt-5 pb-2" style={{backgroundColor: "#bdbdbd", color: "#4f4f4f", fontWeight: "bold"}}>
          <a className="text-dark mr-4 footerContent" href="https://www.rayosalvaje.com" target="_blank" rel='noreferrer'>Términos y condiciones de uso</a>
          <a className="text-dark ml-4 footerContent" href="https://www.rayosalvaje.com" target="_blank" rel='noreferrer'>Políticas de privacidad</a>
        </div>
        <div className="text-center pb-5" style={{backgroundColor: "#bdbdbd", color: "#4f4f4f"}}>
           <span className="footerContent">© 2021 Quiz Royale. All Rights reserved.</span>
        </div>
      </footer>
    )
  }
}










