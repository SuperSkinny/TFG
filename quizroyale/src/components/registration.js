import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap'
import 'firebase/auth'
import { useFirebaseApp } from 'reactfire'


function Registration(props) {
    const [details, setDetails] = useState({email: "", pass: "", pass2: ""});
    const [errors] = useState({email: "", pass: "", pass2: ""})
    const firebase = useFirebaseApp()
   

    const emailCheckHandler = (e) => {
       
            setDetails({...details, email: e.target.value})
              
    }

    const passCheckHandler = (e) => {
       
            setDetails({...details, pass: e.target.value})
               
    }

    const pass2CheckHandler = (e) => {
        
        setDetails({...details, pass2: e.target.value})
                
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        e.target.className += " was-validated"
        console.log("details", details)       
        

        // if(details.email === ""){
        //    errors.email= "Debes introducir un correo electrónico."
        // }
        // else if(!details.email.match(emailPattern)){
        //     errors.email = "El formato del correo electrónico no es válido."
        // }
        // else{
        //     errors.email = ""
        // }

        // if(details.pass === ""){
        //     errors.pass = "Debes introducir una contraseña."
        // }
        // else if(!details.pass.match(passPattern)){
        //     errors.pass = "Debe tener una longitudo entre 6 y 20 caracteres. Se admite cualquier carácter excepto espacios en blanco."
        // }
        // else{
        //     errors.pass = ""
        // }

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
        
            firebase.auth().createUserWithEmailAndPassword(details.email, details.pass)
            .then(() => {
                props.onSuccess()
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                  errors.pass = 'The password is too weak.';
                } 
                else if (errorCode == 'auth/email-already-in-use'){
                    alert('Este correo ha sido registrado con anterioridad. Inicia sesión')
                    props.onFail()
                }
                else {
                  errors.email = errorMessage;
                }
                console.log(error);
              });
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
