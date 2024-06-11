/* eslint-disable react/prop-types */
import { Alert } from "react-bootstrap";
import { ExclamationTriangleFill } from "react-bootstrap-icons";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalAlert({ show, handleClose, modalAction }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%" }} className="text-center">
          <Alert style={{ width: "100%" }} variant="warning">
            Atención
          </Alert>
        </Modal.Title>
      </Modal.Header>
      <ExclamationTriangleFill className="text-warning display-1 m-auto text-center" />
      <Modal.Body className="fs-5 text-dark text-center">
        Este canal puede transmitir contenido no apto para un niño.
        <br /> Si eres un niño, consulta con tus padres antes de continuar.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="warning" onClick={modalAction}>
          Continuar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAlert;
