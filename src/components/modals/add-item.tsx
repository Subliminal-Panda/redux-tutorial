import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { PageType } from "../../App";
import './add-item.scss'

interface AddItemModalProps {
  page: PageType
  pages: PageType[]
}
export const AddItemModal = (props: AddItemModalProps) => {
    const { page, pages } = props
    const [show, setShow] = useState(false);
  
    const handleShow = () => {
      setShow(true);
    }
    
    return (
        <>
        <div className="button-wrap">
          <Button key={"something"} className="me-2" onClick={() => handleShow()}>
            Add Page Item
          </Button>
        </div>
        <Modal 
        size="xl"
        centered
        restoreFocus
        show={show} 
        onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Page Item:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Page</Form.Label>
                <Form.Select required defaultValue={page.title}>
                  {pages.map(page => {
                    if (typeof page.title === 'string') {
                      return(<option>{page.title}</option>)
                    }
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Heading</Form.Label>
                <Form.Control type="text" required placeholder="Enter item title/heading" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control type="text" required as="textarea" rows={4} placeholder="Enter item content/description" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" placeholder="Enter an image URL" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image caption</Form.Label>
                <Form.Control type="text" placeholder="Caption the image above" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Add a link for this content?</Form.Label>
                <Form.Control type="text" placeholder="Enter link URL" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Add a display name for this link?</Form.Label>
                <Form.Control type="text" placeholder="Enter link name (for display)" />
              </Form.Group>
              <Form.Check 
                type="switch"
                id="custom-switch"
                label="Publish"
                defaultChecked={false}
                className="mb-3"
              />
                <Button type="submit">
                  Submit Page Item
                </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
}
