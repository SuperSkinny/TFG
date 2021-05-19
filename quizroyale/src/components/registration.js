import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap'
import model, { checkIfEmailExists } from '../api/model'
import {useHistory} from 'react-router-dom'
import UserRegistered from './userRegistered'
import LoginForm from './login'


function Registration(props) {
    const [details, setDetails] = useState({nickname:"", email: "", pass: "", pass2: ""});
    const [errors] = useState({errorNickname:"", email: "", pass: "", pass2: ""})
    const nicknamePattern = /^[A-Za-z\d]{2,15}$/
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    const passPattern = /^[\S]{6,20}$/
    let history = useHistory()
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow2, setModalShow2] = React.useState(false);
    
    const nicknameCheckHandler = (e) => {
                  
            setDetails({...details, nickname: e.target.value})
             
    }

    const emailCheckHandler = (e) => {
       
            setDetails({...details, email: e.target.value})
              
    }

    const passCheckHandler = (e) => {
       
            setDetails({...details, pass: e.target.value})
               
    }

    const pass2CheckHandler = (e) => {
        
        setDetails({...details, pass2: e.target.value})
                
    }

    const submitHandler = (e) => {
        e.preventDefault();
        e.target.className += " was-validated"
        console.log("details", details)       
        
        if(details.nickname === ""){
            /*setErrors({...errors, errorNickname: "Debes introducir un nickname."})*/
            errors.errorNickname = "Debes introducir un nickname"
            console.log("nickname = vacio", errors)
        }
        else if(!details.nickname.match(nicknamePattern)){
            //setErrors({...errors, errorNickname: "Solo letras y números. Debe tener una longitud entre 2 y 15 caracteres."})
            errors.errorNickname = "Solo letras y números. Debe tener una longitud entre 2 y 15 caracteres."
            console.log("nickname = no cumple patrón")
        }
        else{
            //setErrors({...errors, nickname: ""})
            errors.errorNickname = ""
            console.log("no hay error")
        }

        if(details.email === ""){
           errors.email= "Debes introducir un correo electrónico."
        }
        else if(!details.email.match(emailPattern)){
            errors.email = "El formato del correo electrónico no es válido."
        }
        else{
            errors.email = ""
        }

        if(details.pass === ""){
            errors.pass = "Debes introducir una contraseña."
        }
        else if(!details.pass.match(passPattern)){
            errors.pass = "Debe tener una longitudo entre 6 y 20 caracteres. Se admite cualquier carácter excepto espacios en blanco."
        }
        else{
            errors.pass = ""
        }

        if(details.pass2 === ""){
            errors.pass2 = "Por favor, repite la contraseña."
        }
        else if(details.pass2 !== details.pass){
            errors.pass2 = "La contraseña no coincide."
        }
        else{
            errors.pass2 = ""
        }
        console.log("errors: ", errors)

        if(e.target.checkValidity()){
            model.checkIfEmailExists(details.email).then(response => {
                if (response === true) {
                    setModalShow2(true)
                    return(
                        <LoginForm
                            show={modalShow2}
                            onHide={() => setModalShow2(false)}
                        />
                    )
                }
                else {
                    model.newUser( details.email, details.pass, details.nickname );
                    setModalShow(true)
                    return(
                        <UserRegistered
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    )
                    
                                   
                }
            })
        }
    };

    
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className="container">
                        <span 
                            className="generalTitle" 
                            style={ { fontSize: 40 } }
                        >
                            Registro
                        </span>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container" >           
                    <form className="needs-validation" noValidate onSubmit={submitHandler}>
                        <div className="form-group">
                            <div className="mb-3">
                                {/* <label htmlFor="regNickname" className="form-label">Nickname: </label> */}
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="regNickname" 
                                    placeholder="Nickname"
                                    minLength="2"
                                    maxLength="15"
                                    pattern= "[A-Za-z\d]{2,15}" 
                                    required
                                    onChange={nicknameCheckHandler}
                                    style={ { borderRadius: 15 }}
                                />
                            </div>
                            {(errors.errorNickname !== "") ? 
                                (<p>
                                    <small style={ { color: "red"} }>
                                        {errors.errorNickname}
                                    </small>
                                </p>)
                                : ("")
                            }
                        </div>
                        <div className="form-group">
                            <div className="mb-3">
                                {/* <label htmlFor="regEmail" className="form-label">Correo electrónico: </label> */}
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="regEmail" 
                                    placeholder="Correo electrónico"
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                                    required
                                    onChange={emailCheckHandler}
                                    style={ { borderRadius: 15 }}
                                />
                            </div>
                            {(errors.email !== "") ? 
                                (<p>
                                    <small style={ { color: "red"} }>
                                        {errors.email}
                                    </small>
                                </p>)
                                : ("")
                            } 
                        </div>
                        
                        <div className="form-group">
                            <div className="mb-3">
                                {/* <label htmlFor="regPass" className="form-label">Contraseña: </label> */}
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="regPass" 
                                    placeholder="Contraseña"
                                    minLength="6"
                                    maxLength="20"
                                    pattern="[\S]{6,20}"
                                    required
                                    onChange={passCheckHandler}
                                    style={ { borderRadius: 15 }}
                                />
                            </div>
                            {(errors.pass !== "") ? 
                                (<p>
                                    <small style={ { color: "red"} }>
                                        {errors.pass}
                                    </small>
                                </p>)
                                : ("")
                            } 
                        </div>
                        
                        <div className="form-group">
                            <div className="mb-3">
                            {/* <label htmlFor="regRepitePass" className="form-label">Repite contraseña: </label> */}
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="regRepitePass" 
                                    placeholder="Repite contraseña"
                                    minLength="6"
                                    maxLength="20"
                                    pattern="[\S]{6,20}" 
                                    required
                                    onChange={pass2CheckHandler}
                                    style={ { borderRadius: 15 }}    
                                />
                            </div>
                            {(errors.pass2 !== "") ? 
                                (<p>
                                    <small style={ { color: "red"} }>
                                        {errors.pass2}
                                    </small>
                                </p>)
                                : ("")
                            } 
                        </div>
                        
                        <div className="form group">
                            <div className="mb-3">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    id="checkTerms" 
                                    required
                                />
                                <label 
                                    className="form-check-label" 
                                    htmlFor="chekTerms"
                                >
                                    <small>Acepto los términos y condiciones</small>
                                </label>
                            </div>
                            
                        </div>

                        <input 
                            type="submit" 
                            className="generalButton" 
                            value="Regístrate"

                        />
                    </form>                   
                </div>
            </Modal.Body>
        
        </Modal>
    )
}

export default Registration
