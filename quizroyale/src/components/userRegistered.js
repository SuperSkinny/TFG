import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'


function UserRegistered(props) {
    let history = useHistory()

    const clickHandler = (e) => {
        history.push('/home')
    }

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Body>
            <div className="container">
                <span>Registrado con éxito</span>
            </div>
            <div className="container">
                <Button
                    variant="success"
                    onClick={clickHandler}
                >
                    Ir al inicio
                </Button>
            </div>
        </Modal.Body>
    </Modal>
    )
}

export default UserRegistered
