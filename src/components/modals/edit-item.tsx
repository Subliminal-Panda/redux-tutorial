import { collection, doc, getDocs, limit, orderBy, query, setDoc, updateDoc } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { db, PageType } from "../../App";
import { PageItemType } from "../page/page";
import './add-item.scss'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import ReactHtmlParser from "react-html-parser"
import htmlToDraft from "html-to-draftjs";

interface EditItemModalProps {
  item: PageItemType
  pages: PageType[]
  page: PageType
}
export const EditItemModal = (props: EditItemModalProps) => {
    const { item, pages, page } = props
    const [show, setShow] = useState(false);
    // const [page, setPage] = useState<PageType|undefined>(pages.find(p => p.id === item.page_id) || undefined)
    useEffect(() => {
      if(page !== undefined) {
        console.log(page)
      }
    }, [page])
    const pageTitle = page?.title ? page.title : 'fake title for testing'
    const [formState, setFormState] = useState({
      page: page.title || "",
      title: item.title || "",
      content: item.content || "",
      imageUrl: item.image_url ||"",
      imageCaption: item.image_caption ||"",
      link: item.link_ref || "",
      linkText: item.link_name || "",
      published: false,
    })
    const titleContentBlock = htmlToDraft(formState.title)
    const contentContentBlock = htmlToDraft(formState.content)
    const titleContentState = ContentState.createFromBlockArray(titleContentBlock.contentBlocks)
    const contentContentState = ContentState.createFromBlockArray(contentContentBlock.contentBlocks)
    const [titleEditorState, setTitleEditorState] = useState(EditorState.createWithContent(titleContentState))
    const [contentEditorState, setContentEditorState] = useState(EditorState.createWithContent(contentContentState))
  
    const onTitleEditorStateChange = (titleEditorState: EditorState) => {
      setTitleEditorState(titleEditorState);
      console.log(draftToHtml(convertToRaw(titleEditorState.getCurrentContent())));
    };
    const onContentEditorStateChange = (contentEditorState: EditorState) => {
      setContentEditorState(contentEditorState);
      console.log(draftToHtml(convertToRaw(contentEditorState.getCurrentContent())));
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
      if (item.docId !== undefined) {
        const docRef = doc(db, 'items', item.docId)
        const pageId = pages.find(p => p.title === formState.page)?.id;
        const docData = {
          page_id: pageId,
          published: formState.published,
          title: draftToHtml(convertToRaw(titleEditorState.getCurrentContent())),
          content: draftToHtml(convertToRaw(contentEditorState.getCurrentContent())),
          image_url: formState.imageUrl,
          image_caption: formState.imageCaption,
          link_name: formState.linkText,
          link_ref: formState.link,
        };
        await updateDoc(docRef, docData);
        console.log('updated item successfully', docRef)
        setShow(false)
      } else {
        console.log('item has no ID', item.id)
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

    return (
        <>
        <FontAwesomeIcon icon={solid('pencil')} size='4x' className='page-item-edit' onClick={() => handleShow()}/>
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
                  editorState={titleEditorState}
                  editorClassName="form-control"
                  onEditorStateChange={onTitleEditorStateChange}
                  placeholder="Enter item title/heading" 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Editor
                  editorState={contentEditorState}
                  editorClassName="form-control"
                  onEditorStateChange={onContentEditorStateChange}
                  placeholder="Enter item content" 
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
                className="mb-3"
                name="published"
                checked={formState.published} 
                onChange={handleChange}
              />
                {/* <Button type="submit">
                  Submit Updated Page Item
                </Button> */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="danger" onClick={() => setShow(false)}>Cancel</Button>
              <Button variant="primary" onClick={e => handleSubmit(e)}>Submit Updated Page Item</Button>
            </Modal.Footer>
        </Modal>
      </>
    );
}
