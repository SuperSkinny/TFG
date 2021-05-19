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
        <Modal.Header closeButton>
            <div className="container">
                <span className="cardTitle">
                    Registrado con éxito
                </span>
            </div>
        </Modal.Header>
    </Modal>
    )
}

export default UserRegistered
