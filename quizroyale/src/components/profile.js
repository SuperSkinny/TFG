// import React, { useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import * as model from '../api/model';
// import {useHistory} from 'react-router-dom'


// function Profile(){
//     const [details, setDetails] = useState({nickname:"", email: "", oldPass: "", pass: "", pass2: ""})
//     const [errors] = useState({errorNickname:"", email: "", oldPass: "", pass: "", pass2: ""})
//     const uploadedImage = React.useRef(null)
//     const imageUploader = React.useRef(null)
//     const nicknamePattern = /^[A-Za-z\d]{2,15}$/
//     const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
//     const passPattern = /^[\S]{6,20}$/
//     let history = useHistory()
//     let setImage = false
//     let image

//     const user = getUserByEmailAndPassword('christian@quizroyale.com', '123456').then()
    
    
//     const nicknameCheckHandler = (e) => {
                  
//             setDetails({...details, nickname: e.target.value})
             
//     }

//     const emailCheckHandler = (e) => {
       
//             setDetails({...details, email: e.target.value})
              
//     }

//     const oldPassCheckHandler = (e) => {
       
//             setDetails({...details, oldPass: e.target.value})
               
//     }
    
//     const passCheckHandler = (e) => {
       
//             setDetails({...details, pass: e.target.value})
               
//     }

//     const pass2CheckHandler = (e) => {
        
//         setDetails({...details, pass2: e.target.value})
                
//     }

//     const handleImageUpload = e => {
//         const [file] = e.target.files;
//         if (file) {
//           const reader = new FileReader();
//           const { current } = uploadedImage;
//           current.file = file;
//           reader.onload = e => {
//             current.src = e.target.result;
//             image = current.src
//             setImage = true
//           };
          
//           reader.readAsDataURL(file);
          
          
//         }
//       };

//     const submitHandler = (e) => {
//         e.preventDefault();
//         e.target.className += " was-validated"


//         if(!details.nickname.match(nicknamePattern)){
//             //setErrors({...errors, errorNickname: "Solo letras y n??meros. Debe tener una longitud entre 2 y 15 caracteres."})
//             errors.errorNickname = "Solo letras y n??meros. Debe tener una longitud entre 2 y 15 caracteres."
//             console.log("nickname = no cumple patr??n")
//         }
//         else {
//             //setErrors({...errors, nickname: ""})
//             errors.errorNickname = ""
//             console.log("no hay error")
//         }

//         if(!details.email.match(emailPattern)){
//             errors.email = "El formato del correo electr??nico no es v??lido."
//         }
//         else {
//             errors.email = ""
//         }

//         if(!details.pass.match(passPattern)){
//             errors.pass = "Debe tener una longitudo entre 6 y 20 caracteres. Se admite cualquier car??cter excepto espacios en blanco."
//         }
//         else{
//             errors.pass = ""
//         }

//         if(details.pass2 === ""){
//             errors.pass2 = "Por favor, repite la contrase??a."
//         }
//         else if(details.pass2 !== details.pass){
//             errors.pass2 = "La contrase??a no coincide."
//         }
//         else{
//             errors.pass2 = ""
//         }
        
//         console.log("errors: ", errors)

//         if(e.target.checkValidity()){
//             getUserByEmailAndPassword('pedrini@quizroyale.com', '123456').then(user => {
//                 console.log(user)

//                 if(details.nickname !== ''){
//                     model.changeUserNickname(user.objectId, details.nickname)
//                 }

//                 if(details.email !== '' ){
//                     model.checkIfEmailExists(details.email).then(response => {
//                         if (response === true) {
//                             alert("maquina, este correo no vale porque ya est?? registrado")
//                         }
//                         else {
//                             console.log("correo cambiado"); 
//                             model.changeUserEmail(user.objectId, details.email)
//                         }
//                     })
//                 }

//                 if(details.pass !== '' && details.pass === details.pass2 && details.oldPass === user.password ){
//                 model.changeUserPassword(user.objectId, details.pass)
//                 }

//                 if(setImage === true){
//                 model.changeUserPicture(user.objectId, image)
//                 }
//             })
//         }
//     };

    
//     return (
//         <div className="container" >
//             <span className="generalTitle" style={??{ fontSize: 40 } }>Perfil</span>
//             <form className="needs-validation" noValidate onSubmit={submitHandler}>
//                 <div className="form-group">
//                     <div
//                         style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "left",
//                             justifyContent: "left"
//                         }}
//                         >
//                         <input
//                             type="file"
//                             accept="image/*"
//                             onChange={handleImageUpload}
//                             ref={imageUploader}
//                             style={{
//                             display: "none"
//                             }}
//                         />
//                         <div
//                             style={{
//                             height: "150px",
//                             width: "150px",
//                             borderRadius: 15
//                             }}
//                             onClick={() => imageUploader.current.click()}
//                         >
//                             <img
//                             ref={uploadedImage}
//                             style={{
//                                 width: "100%",
//                                 height: "100%",
//                                 position: "center",
//                                 borderRadius: 15
//                             }}
//                             />
//                         </div>
//                         {/* {console.log(uploadedImage)}
//                         {uploadedImage.current.accessKey === "" ? 
//                             (<p>A??ade una imagen</p>)
//                             :(<p>Cambia tu imagen</p>)
//                         } */}
//                         </div>
                    
//                 </div>
//                 <div className="form-group">
//                     <div className="mb-3">
//                         {/* <label htmlFor="regNickname" className="form-label">Nickname: </label> */}
//                         <input 
//                             type="text" 
//                             className="form-control" 
//                             id="proNickname" 
//                             placeholder="Nickname"
//                             minLength="2"
//                             maxLength="15"
//                             pattern= "[A-Za-z\d]{2,15}" 
//                             required
//                             onChange={nicknameCheckHandler}
//                             style={ { borderRadius: 15 }}
//                         />
//                     </div>
//                     {(errors.errorNickname !== "") ? 
//                         (<p>
//                             <small style={ { color: "red"} }>
//                                 {errors.errorNickname}
//                             </small>
//                         </p>)
//                         : ("")
//                     }
//                 </div>
//                 <div className="form-group">
//                     <div className="mb-3">
//                         {/* <label htmlFor="regEmail" className="form-label">Correo electr??nico: </label> */}
//                         <input 
//                             type="text" 
//                             className="form-control" 
//                             id="proEmail" 
//                             placeholder="Correo electr??nico"
//                             pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
//                             required
//                             onChange={emailCheckHandler}
//                             style={ { borderRadius: 15 }}
//                         />
//                     </div>
//                     {(errors.email !== "") ? 
//                         (<p>
//                             <small style={ { color: "red"} }>
//                                 {errors.email}
//                             </small>
//                         </p>)
//                         : ("")
//                     } 
//                 </div>
//                 <div className="form-group">
//                     <div className="mb-3">
//                         {/* <label htmlFor="regPass" className="form-label">Contrase??a: </label> */}
//                         <input 
//                             type="password" 
//                             className="form-control" 
//                             id="proPass" 
//                             placeholder="Contrase??a antigua"
//                             minLength="6"
//                             maxLength="20"
//                             pattern="[\S]{6,20}"
//                             required
//                             onChange={oldPassCheckHandler}
//                             style={ { borderRadius: 15 }}
//                         />
//                     </div>
//                     {(errors.pass !== "") ? 
//                         (<p>
//                             <small style={ { color: "red"} }>
//                                 {errors.pass}
//                             </small>
//                         </p>)
//                         : ("")
//                     } 
//                 </div>
                
//                 <div className="form-group">
//                     <div className="mb-3">
//                         {/* <label htmlFor="regPass" className="form-label">Contrase??a: </label> */}
//                         <input 
//                             type="password" 
//                             className="form-control" 
//                             id="proPass" 
//                             placeholder="Contrase??a nueva"
//                             minLength="6"
//                             maxLength="20"
//                             pattern="[\S]{6,20}"
//                             required
//                             onChange={passCheckHandler}
//                             style={ { borderRadius: 15 }}
//                         />
//                     </div>
//                     {(errors.pass !== "") ? 
//                         (<p>
//                             <small style={ { color: "red"} }>
//                                 {errors.pass}
//                             </small>
//                         </p>)
//                         : ("")
//                     } 
//                 </div>
                
//                 <div className="form-group">
//                     <div className="mb-3">
//                     {/* <label htmlFor="regRepitePass" className="form-label">Repite contrase??a: </label> */}
//                         <input 
//                             type="password" 
//                             className="form-control" 
//                             id="proRepitePass" 
//                             placeholder="Repite la contrase??a nueva"
//                             minLength="6"
//                             maxLength="20"
//                             pattern="[\S]{6,20}" 
//                             required
//                             onChange={pass2CheckHandler}
//                             style={ { borderRadius: 15 }}    
//                         />
//                     </div>
//                     {(errors.pass2 !== "") ? 
//                         (<p>
//                             <small style={ { color: "red"} }>
//                                 {errors.pass2}
//                             </small>
//                         </p>)
//                         : ("")
//                     } 
//                 </div>
                                
//                 <input 
//                     type="submit" 
//                     className="generalButton" 
//                     value="Guardar"

//                 />
//             </form>
            
//         </div>
//     )

// }

// export default Profile
