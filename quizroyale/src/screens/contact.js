import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Fade } from 'react-bootstrap'
import '../assets/styles/styles.css'
import * as model from '../api/model';
import { useUser } from 'reactfire'


export default function Contact() { 
  const user = useUser()
  const [details, setDetails] = useState({name: "", email: "", issue: "", message: ""});
  const [sent, setSent] = useState(false)
  const [fade, setFade] = useState(false)
  
  const nameCheckHandler = (e) => {
       
    setDetails({...details, name: e.target.value})
    setSent(false)
    setFade(false)
  }

  const emailCheckHandler = (e) => {

    setDetails({...details, email: e.target.value})
    setSent(false)
    setFade(false) 
  }

  const issueCheckHandler = (e) => {

    setDetails({...details, issue: e.target.value})
    setSent(false)
    setFade(false)   
  }

  const messageCheckHandler = (e) => {

    setDetails({...details, message: e.target.value})
    setSent(false)
    setFade(false)    
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    e.target.className += " was-validated"
    
    if(user.data){
      details.email = user.data.email
    }

    if(e.target.checkValidity()){
      //model.newContact(details.name, details.email, details.issue, details.message)
      let mailDetails = {
        name: details.name,
        email: details.email,
        issue: details.issue,
        message: details.message,
      }
      let response = await fetch("https://quizroyale.es:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(mailDetails),
      });
      await response.json();

      setSent(true)
      setFade(true)

    }
  }

    return (
      <div  style={ { display: "flex", justifyContent: 'center' }}>

        <div style={ { width: 700, marginLeft:14, marginRight: 14 }}>
          <div>
            <span className="generalTitle" >
              ¿Tienes alguna duda? ¡Contáctanos!
            </span>
          </div>
          <form className="needs-validation" noValidate onSubmit={submitHandler}>
          <div className="mb-3">
              
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                placeholder="Nombre"
                required
                onChange={nameCheckHandler}
                style={ { borderRadius: 15 }}  
              />
            </div>
            {user.data ? ('')
            :(<div className="mb-3">
              {/* <label for="emailInput" className="form-label"></label> */}
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                placeholder="Correo electrónico"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
                onChange={emailCheckHandler} 
                style={ { borderRadius: 15 }}  
              />
            </div>)
            }
            
            <div className="mb-3">
              {/* <label for="subjectInput" className="form-label"></label> */}
              <input 
                type="text" 
                className="form-control" 
                id="subjectInput" 
                placeholder="Asunto"
                required
                onChange={issueCheckHandler}
                style={ { borderRadius: 15 }}  
              />
            </div>
            <div className="mb-3">
              {/* <label for="exampleFormControlTextarea1" className="form-label">¡Tu mensaje!</label> */}
              <textarea 
                className="form-control" 
                id="exampleFormControlTextarea1" 
                rows="5"
                placeholder="Cuéntanos qué te aflije..."
                required
                onChange={messageCheckHandler}
                style={ { borderRadius: 15 }}
              ></textarea>
            </div>
            {sent ? (<button 
                  type="submit" 
                  className="generalButton"
                  disabled
                >
                  Enviar
                </button>):
                ( <button 
                  type="submit" 
                  className="generalButton"
                >
                  Enviar
                </button>
            )}
           
            
            {sent ? (
                  <Fade in={fade}>
                    <span className="ml-5">Mensaje enviado</span>
                  </Fade>
                  
                ):''
            }
          </form>
        </div>
      </div>
    )
}
