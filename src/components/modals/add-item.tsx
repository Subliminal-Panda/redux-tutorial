import { collection, doc, getDocs, limit, orderBy, query, setDoc } from "firebase/firestore/lite";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { db, PageType } from "../../App";
import { PageItemType } from "../page/page";
import './add-item.scss'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { Component } from 'react';

interface AddItemModalProps {
  page: PageType
  pages: PageType[]
}
export const AddItemModal = (props: AddItemModalProps) => {
    const { page, pages } = props
    const [show, setShow] = useState(false);
    const [formState, setFormState] = useState({
      page: page.title,
      title: "",
      content: "",
      imageUrl: "",
      imageCaption: "",
      link: "",
      linkText: "",
      published: false,
    })
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
  
    const onEditorStateChange = (editorState: EditorState) => {
      setEditorState(editorState);
    };
  
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
      const itemsRef = collection(db, 'items');
      const q = query(itemsRef, orderBy('id', 'desc'), limit(1))
      const queryDocs = await getDocs(q)
      if (!queryDocs.empty) {
        const highest = queryDocs.docs[0];
        const data = highest.data();
        const newDocRef = doc(collection(db, 'items'))
        const pageId = pages.find(p => p.title === formState.page)?.id;
        const docData: PageItemType = {
          id: data.id + 1,
          page_id: pageId,
          published: formState.published,
          title: formState.title,
          content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          image_url: formState.imageUrl,
          image_caption: formState.imageCaption,
          link_name: formState.linkText,
          link_ref: formState.link,
          docId: newDocRef.id
        };
        setDoc(doc(db, 'items', newDocRef.id), docData);
      } else {
        console.log('unable to retrieve items from DB.')
      }
      setShow(false)
    }

    const uploadFile = (file: any) => {
        return new Promise((resolve, reject) => {
            const callback = (data: any) => resolve({data: {link: data}})
            getBase64(file, callback)
        })
    }

    const getBase64 = (file: any, callback: any) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => callback(reader.result);
        reader.onerror = error => {};
    }

    // const onEditorStateChange = (editorState: any) => {
      // setEditorState(draftToHtml(convertToRaw(editorState.getCurrentContent())))
      //you can't trust this.setState to happen immediately- it's asynchronouse! Don't expect to use the new state if you call it immediately afterward, within the same function! However, you can pass in a second argument which will only fire after state is updated!
  // }
    
    return (
        <>
        <div className="button-wrap">
          <Button key={"addPageItem"} className="me-2" onClick={() => handleShow()}>
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
            <Form onSubmit={(event) => handleSubmit(event)}>
              <Form.Group className="mb-3">
                <Form.Label>Page</Form.Label>
                <Form.Select 
                  required 
                  // defaultValue={page.title}
                  name="page"
                  value={formState.page} 
                  onChange={handleChange}
                >
                  {pages.map(page => {
                    if (typeof page.title === 'string') {
                      return(<option>{page.title}</option>)
                    }
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Heading</Form.Label>
                <Editor
                  editorState={editorState}
                  // wrapperClassName="demo-wrapper"
                  editorClassName="form-control"
                  onEditorStateChange={onEditorStateChange}
                  // required 
                  placeholder="Enter item title/heading" 
                  // name="title"
                  // value={formState.title} 
                />
                {/* <Form.Control 
                  type="text" 
                  required 
                  placeholder="Enter item title/heading" 
                  name="title"
                  value={formState.title} 
                  onChange={handleChange}
                /> */}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control 
                  type="text" 
                  required 
                  as="textarea" 
                  rows={4} 
                  placeholder="Enter item content/description" 
                  name="content"
                  value={formState.content} 
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter an image URL" 
                  name="imageUrl"
                  value={formState.imageUrl} 
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image caption</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Caption the image above" 
                  name="imageCaption"
                  value={formState.imageCaption} 
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Page item link</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter link URL" 
                  name="link"
                  value={formState.link} 
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Link display text</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter link name (visible link text)" 
                  name="linkText"
                  value={formState.linkText} 
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Check 
                type="switch"
                id="custom-switch"
                label="Publish"
                // defaultChecked={false}
                className="mb-3"
                name="published"
                checked={formState.published} 
                onChange={handleChange}
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
