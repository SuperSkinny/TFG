import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, Button } from 'react-bootstrap'



function UserRegistered(props) {

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
