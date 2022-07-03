import { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap"
import { PageType } from "../../App";
import './add-item.scss'

interface AddItemModalProps {
  page: PageType
}
export const AddItemModal = (props: AddItemModalProps) => {
    const { page } = props
    const [show, setShow] = useState(false);
  
    const handleShow = () => {
      setShow(true);
    }
    
    return (
        <>
        <div className="button-wrap">
          <Button key={"something"} className="me-2" onClick={() => handleShow()}>
            Add {page.title} Page Item
          </Button>
        </div>
        <Modal 
        show={show} 
        onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>Modal body content
            <Form>
              <InputGroup>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </InputGroup>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
}
