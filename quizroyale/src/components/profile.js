import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import model, { checkIfEmailExists } from '../api/model'
import {useHistory} from 'react-router-dom'


function Profile(){
    const [details, setDetails] = useState({nickname:"", email: "", pass: "", pass2: ""})
    const [errors] = useState({errorNickname:"", email: "", pass: "", pass2: ""})
    const uploadedImage = React.useRef(null)
    const imageUploader = React.useRef(null)
    const nicknamePattern = /^[A-Za-z\d]{2,15}$/
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    const passPattern = /^[\S]{6,20}$/
    let history = useHistory()
    const mailDePrueba = 'test@quizroyale.com'
    
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

    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
          const reader = new FileReader();
          const { current } = uploadedImage;
          current.file = file;
          reader.onload = e => {
            current.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      };

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
                    alert("maquina ya estás registrado")
                    history.push('/login')
                }
                else {
                    console.log("Usuario registrado"); 
                    model.newUser( details.email, details.pass, details.nickname );
                    history.push('/home')
                }
            })
        }
    };

    
    return (
        <div className="container" >
            <span className="generalTitle" style={ { fontSize: 40 } }>Perfil</span>
            <form className="needs-validation" noValidate onSubmit={submitHandler}>
                <div className="form-group">
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "left",
                            justifyContent: "left"
                        }}
                        >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            ref={imageUploader}
                            style={{
                            display: "none"
                            }}
                        />
                        <div
                            style={{
                            height: "150px",
                            width: "150px",
                            borderRadius: 15
                            }}
                            onClick={() => imageUploader.current.click()}
                        >
                            <img
                            ref={uploadedImage}
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "center",
                                borderRadius: 15
                            }}
                            />
                        </div>
                        {/* {console.log(uploadedImage)}
                        {uploadedImage.current.accessKey === "" ? 
                            (<p>Añade una imagen</p>)
                            :(<p>Cambia tu imagen</p>)
                        } */}
                        </div>
                    </div>
                <div className="form-group">
                    <div className="mb-3">
                        {/* <label htmlFor="regNickname" className="form-label">Nickname: </label> */}
                        <input 
                            type="text" 
                            className="form-control" 
                            id="proNickname" 
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
                            id="proEmail" 
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
                            id="proPass" 
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
                            id="proRepitePass" 
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
                                
                <input 
                    type="submit" 
                    className="generalButton" 
                    value="Guardar"

                />
            </form>
            
        </div>
    )

}

export default Profile
