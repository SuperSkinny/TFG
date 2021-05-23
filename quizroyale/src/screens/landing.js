import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginForm from '../components/login'
import Registration from '../components/registration'
import UserRegistered from '../components/userRegistered'
import { useHistory } from 'react-router-dom'
import { useUser } from 'reactfire'


const Landing = props => {
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow2, setModalShow2] = React.useState(false);
    const [modalShow3, setModalShow3] = React.useState(false);
    let history = useHistory()
    const user = useUser()

    const toggleModal1 = () => {
        setModalShow2(false)
        setModalShow3(true)
    }

    const toggleModal2 = () => {
        setModalShow2(false)
        setModalShow(true)
    }

    const loginSuccess = () => {
        setModalShow(false)
        history.push('/')
    }
    
        return (
            <div 
                className="content" 
                style={ { 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center", 
                    alignItems: "center" 
                }}
            >
                <div>
                    <span className="generalTitle">
                        ¿Te atreves a jugar?
                    </span>
                </div>
                <div>
                    <button 
                        className="gameButton"
                        onClick={() => setModalShow2(true)}
                    >
                        Regístrate
                    </button>
                    <Registration
                        show={modalShow2}
                        onHide={() => setModalShow2(false)}
                        onSuccess={toggleModal1}
                        onFail={toggleModal2}
                    />
                    <UserRegistered
                        show={modalShow3}
                        onHide={() => setModalShow3(false)}
                    />
                    <p 
                        
                        style={{ 
                            color: "#4F4F4F", 
                            textAlign: "center",
                            
                        }}
                    >
                        O <a 
                            style={{textDecoration: "underline"}}
                            onClick={() => setModalShow(true)}
                        
                        >inicia sesión</a> para empezar
                    </p>
                    <LoginForm
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        onSuccess={loginSuccess}
                    />
                </div>
                
            </div>
        )
   
}

export default Landing
