import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import  { Modal } from 'react-bootstrap';
import 'firebase/auth'
import { useFirebaseApp, useUser } from 'reactfire'

function LoginForm(props){
    const [details, setDetails] = useState({email: "", pass: ""});
    const [errors, setErrors] = useState();
    const firebase = useFirebaseApp()
   
    const submitHandler = e => {
        e.preventDefault();
         firebase.auth().signInWithEmailAndPassword(details.email, details.pass)
         .then(()=>{
            props.onSuccess()
         })
         .catch(function(error){
            let errorCode = error.code
            let errorMessage = error.message
            if (errorCode === 'auth/wrong-password') {
                setErrors('Contraseña incorrecta');
              } 
            else {
                setErrors(errorMessage);          
              }                 
        })
        

    }

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className="container">
                        <span className="generalTitle" style={ { fontSize: 40 } }>Iniciar sesión</span>
                        
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <form onSubmit = {submitHandler}>
                        <div className="mb-3">
                            {/* <label htmlFor="loginEmail" className="form-label">Correo electrónico: </label> */}
                            <input 
                                type="text" 
                                className="form-control" 
                                id="loginEmail" 
                                placeholder="Correo eletrónico" 
                                required onChange={e => setDetails({...details, email: e.target.value})} 
                                value={details.email} 
                                style={ { borderRadius: 15 }}
                            />
                        </div>
                        <div className="mb-3">
                            {/* <label htmlFor="loginPass" className="form-label">Contraseña: </label> */}
                            <input 
                                type="password" 
                                className="form-control" 
                                id="loginPass" 
                                placeholder="Contraseña" 
                                required onChange={e => setDetails({...details, pass: e.target.value})} 
                                value={details.pass} 
                                style={ { borderRadius: 15 }}
                            />
                            {(errors) ? (<p>
                                    <small style={ { color: "red"} }>
                                        {errors}
                                    </small>
                                </p>)
                                : ("")}
                        </div>
                        <p><small>Has olvidado la contraseña? Pues no pulses porque esto no hace nada todavía</small></p>
                        <input 
                            type="submit" 
                            className="generalButton" 
                            value="Iniciar sesión"
                        />
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}


export default LoginForm;
