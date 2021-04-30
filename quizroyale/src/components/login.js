import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom'
import { getUserByEmailAndPassword } from '../api/model';

function LoginForm(){
    const [details, setDetails] = useState({email: "", pass: ""});
    const [errors] = useState({error: ""})
    let history = useHistory();
    const mailDePrueba = 'test@quizroyale.com'
    const submitHandler = e => {
        e.preventDefault();
        if(details.email !== mailDePrueba){ // cambiar por checkIfEmailExists
            errors.error = "no estás registrado"
            alert('no estás registrado')
            history.push('/registration')
        }
        else{
            getUserByEmailAndPassword(details.email, details.pass)
            history.push('/home')   
        }
        
    }

    return(
        <div className="container">
            <span className="generalTitle" style={ { fontSize: 40 } }>Iniciar sesión</span>
            {(errors.error != "") ? (<div className="error">{errors.error}</div>) : ""}
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
    );
}


export default LoginForm;