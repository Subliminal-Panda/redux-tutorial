import { doc, deleteDoc } from "firebase/firestore/lite";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { db, PageType } from "../../App";
import './add-item.scss'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import ReactHtmlParser from "react-html-parser"

interface DeletePageModalProps {
  pages: PageType[]
}
export const DeletePageModal = (props: DeletePageModalProps) => {
    const { pages } = props
    const [show, setShow] = useState(false);
    const [formState, setFormState] = useState({
      page: pages[0]
    })

    async function handleSubmit (event: React.FormEvent) {
      event.preventDefault()
      if (formState.page.docId !== undefined) {
        const docRef = doc(db, 'pages', formState.page.docId)
        await deleteDoc(docRef);
        console.log('deleted item successfully', docRef)
        setShow(false)
      } else {
        console.log('item has no ID', formState.page.id)
      }
    }
    function handleChange(event: React.ChangeEvent<{ value: string, name: string }>) {
      event.preventDefault();
      const value = event?.target?.value;
      const page = pages.find(p => p.title === value)
      console.log(value)
      console.log(page)
      if (page) {
        setFormState({
          page: page
        });
      }
    }

    return (
        <>
        <div className="button-wrap add-item">
          <Button key={"deletePageItem"} className="me-2" onClick={() => setShow(true)}>
          <FontAwesomeIcon icon={solid('trash')} size='1x' className='page-delete'/> Page
          </Button>
        </div>
          <Modal size="xl" centered restoreFocus show={show}  onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Page?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={(event) => handleSubmit(event)}>
              <Form.Group className="mb-3">
                <Form.Select 
                      required 
                      name="page"
                      value={formState.page.title} 
                      onChange={handleChange}
                    >
                  {pages.map(page => {
                    if (typeof page.title === 'string') {
                      return(<option>{page.title}</option>)
                    }
                  })}
                </Form.Select>
                </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setShow(false)}>Cancel</Button>
              <Button variant="danger" onClick={e => handleSubmit(e)}>Delete Page</Button>
            </Modal.Footer>
          </Modal>
      </>
    );
}
