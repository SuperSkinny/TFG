import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom'
import { model } from '../api/model';
import  { Modal } from 'react-bootstrap';

function LoginForm(props){
    const [details, setDetails] = useState({email: "", pass: ""});
    const [errors] = useState({error: ""})
    let history = useHistory();
   
    const submitHandler = e => {
        e.preventDefault();
        model.checkIfEmailExists(details.email).then(response => {
            if(response === true){ 
                errors.error = "no estás registrado"
                alert('no estás registrado')
                history.push('/registration')
            }
            else{
                model.getUserByEmailAndPassword(details.email, details.pass)
                history.push('/home')   // hay que gestionar el inicio de sesión en algún momento para ir a home con la sesión iniciada
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
                        {(errors.error != "") ? (<div className="error">{errors.error}</div>) : ""}
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
