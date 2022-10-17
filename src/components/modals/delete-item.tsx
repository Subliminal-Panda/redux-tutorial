import { doc, deleteDoc } from "firebase/firestore/lite";
import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap"
import { db } from "../../App";
import { PageItemType } from "../page/page";
import './add-item.scss'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import ReactHtmlParser from "react-html-parser"

interface AddItemModalProps {
  item: PageItemType
}
export const DeleteItemModal = (props: AddItemModalProps) => {
    const { item } = props
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('')
    useEffect(() => {
      setTitle(item.title || '')
    }, [item])

    async function handleSubmit (event: React.FormEvent) {
      event.preventDefault()
      if (item.docId !== undefined) {
        const docRef = doc(db, 'items', item.docId)
        await deleteDoc(docRef);
        console.log('deleted item successfully', docRef)
        setShow(false)
      } else {
        console.log('item has no ID', item.id)
      }
    }

    return (
        <>
          <FontAwesomeIcon icon={solid('trash')} size='4x' className='page-item-delete' onClick={() => setShow(true)}/>
          <Modal size="xl" centered restoreFocus show={show}  onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Page Item?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <>
                {ReactHtmlParser(title)}
              </>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setShow(false)}>Cancel</Button>
              <Button variant="danger" onClick={e => handleSubmit(e)}>Delete Item</Button>
            </Modal.Footer>
          </Modal>
      </>
    );
}
