import { useState } from "react";
import { Button, Modal } from "react-bootstrap"
import './add-item.scss'

export const AddPageModal = () => {
    const [show, setShow] = useState(false);
  
    const handleShow = () => {
      setShow(true);
    }
    
    return (
        <>
        <div className="button-wrap">
          <Button key={"something"} className="me-2" onClick={() => handleShow()}>
            Add Page
          </Button>
        </div>
        <Modal 
        show={show} 
        onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>Modal body content</Modal.Body>
        </Modal>
      </>
    );
}
