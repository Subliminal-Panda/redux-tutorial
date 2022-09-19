import { collection, doc, getDocs, limit, orderBy, query, setDoc } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { db } from "../../App";
import './add-item.scss'

export const DeletePageModal = () => {
    const [show, setShow] = useState(false);
    const [formState, setFormState] = useState({
      pageName: "",
      pageRoute: ""
    })
  
    const handleShow = () => {
      setShow(true);
    }

    function handleChange(event: React.ChangeEvent<{ value: string, name: string }>) {
      event.preventDefault();
      const value = event?.target?.value;
      setFormState({
        ...formState,
        [event?.target?.name]: value
      });
    }

    async function handleSubmit (event: React.FormEvent) {
      event.preventDefault()
      const pagesRef = collection(db, 'pages');
      const q = query(pagesRef, orderBy('id', 'desc'), limit(1))
      const queryDocs = await getDocs(q)
      if (!queryDocs.empty) {
        const highest = queryDocs.docs[0];
        const data = highest.data();
        const newDocRef = doc(collection(db, 'pages'))
        const docData = {
          id: data.id + 1,
          title: formState.pageName,
          route: formState.pageRoute,
          docId: newDocRef.id
        };
        setDoc(doc(db, 'pages', newDocRef.id), docData);
      } else {
        console.log('unable to retrieve pages from DB.')
      }
      setShow(false)
    }
    
    return (
        <>
        <div className="button-wrap">
          <Button key={"addPage"} className="me-2" onClick={() => handleShow()}>
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
            <Form onSubmit={(event) => handleSubmit(event)}>
              <Form.Group className="mb-3">
                <Form.Label>Page Name</Form.Label>
                <Form.Control 
                type="text" 
                required 
                placeholder="Enter a page name" 
                name="pageName"
                value={formState.pageName} 
                onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Page Route</Form.Label>
                <Form.Control 
                type="text" 
                required 
                placeholder="Enter a page route name" 
                name="pageRoute"
                value={formState.pageRoute} 
                onChange={handleChange} 
                />
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
