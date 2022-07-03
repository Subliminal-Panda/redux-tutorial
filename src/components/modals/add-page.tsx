import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
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
        size="xl"
        centered
        restoreFocus
        show={show} 
        onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Site Page:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Page Name</Form.Label>
                <Form.Control type="text" required placeholder="Enter a page name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Page Route</Form.Label>
                <Form.Control type="text" required placeholder="Enter a page route name" />
              </Form.Group>
              <Button type="submit">
                  Submit New Page
                </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
}
