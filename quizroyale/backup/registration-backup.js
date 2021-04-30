import React, {useState, useRef} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'


function Registration() {
    const [details, setDetails] = useState({nickname:"", email: "", pass: "", pass2: ""});

    const nicknameCheckHandler = (e) => {
        if(e.target.value.match("[A-Za-z\d]{2,15}")){
            
            setDetails({...details, nickname: e.target.value})
        }
    }

    const emailCheckHandler = (e) => {
        if(e.target.value.match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")){
            setDetails({...details, email: e.target.value})
        }
    }

    const passCheckHandler = (e) => {
        if(e.target.value.match("[\S]{6,20}")){
            setDetails({...details, pass: e.target.value})
        }
    }

    const pass2CheckHandler = (e) => {
        if(e.target.value.match("[\S]{6,20}") && (e.target.value == details.pass.value)){
            setDetails({...details, pass2: e.target.value})
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(details.pass != details.pass2){
            alert("no coinciden")
        }
        
        e.target.className += " was-validated"
      
        if(e.target.checkValidity()){
           console.log("dispatch an action"); 
        }
        
      };

    
    return (
        <div className="container" >
            <span className="generalTitle" style={ { fontSize: 40 } }>Registro</span>
            {/*ERROR!*/}
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
                    <div className="invalid-feedback">
                        Sólo letras y números. La longitud debe ser entre 2 y 15 caracteres.
                    </div>
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
                    <div className="invalid-feedback">
                        No es un formato de correo electrónico válido.
                    </div>  
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
                    <div className="invalid-feedback">
                        La longitud debe ser entre 6 y 20 caracteres.
                    </div>
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
    )
}

export default Registration
