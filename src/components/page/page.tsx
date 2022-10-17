import { ContentState, convertToRaw, EditorState } from "draft-js"
import { collection, DocumentData, Firestore, getDocs } from "firebase/firestore/lite"
import htmlToDraft from "html-to-draftjs"
import React, { useEffect, useState } from "react"
import { RawDraftContentState } from "react-draft-wysiwyg"
import { db, PageType } from "../../App"
import Header from "../header/header"
import { AddItemModal } from "../modals/add-item"
import "./page.scss"
import ReactHtmlParser from "react-html-parser"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { AddPageModal } from "../modals/add-page"
import { EditItemModal } from "../modals/edit-item"
import { DeleteItemModal } from "../modals/delete-item"
import { DeletePageModal } from "../modals/delete-page"

// import { collection, doc, setDoc } from "firebase/firestore";

interface PageComponentProps {
    page: PageType
    pages: PageType[]
}

export interface PageItemType {
    id: number
    page_id?: number
    published?: boolean
    title?: string
    content?: string
    icon_id?: number
    image_id?: number
    image_caption?: string
    image_url?: string
    link_name?: string
    link_ref?: string
    docId?: string
}

export default function Page (props: PageComponentProps) {
    const { page, pages } = props
    const [allItems, setAllItems] = useState<PageItemType[]>([])

    const trees1 = 'https://i.imgur.com/UoD91zv.png'
    const trees2 = 'https://i.imgur.com/D9no82p.png'
    const trees3 = 'https://i.imgur.com/TbfzchU.png'
    const trees4 = 'https://i.imgur.com/HHmiQm3.png'
    const trees5 = 'https://i.imgur.com/oiIZuLm.png'

    const [ backgroundArray ] = useState([ trees1, trees2, trees3, trees4, trees5 ])
    const [ bgOptions ] = useState([0,1,2,3,4])
    const [ lastThree ] = useState([57])
    const [ randomBackground, setRandomBackground ] = useState(backgroundArray[0])

    // const headerHeight: HTMLElement | null = document.querySelector('.header')
    // const height = headerHeight?.offsetHeight;
    // const pageContent: HTMLElement | null = document.querySelector('.page-content')

    // useEffect(() => {
    //     if (pageContent) {
    //         pageContent.style.transform = "translateY(" + height + "px)"
    //     }
    // }, [height])
    
    useEffect(() => {
        const leftOver = bgOptions.filter(opt => !lastThree.includes(opt))
        const randIndex = leftOver[Math.floor(Math.random()*leftOver.length)]
        setRandomBackground(backgroundArray[randIndex])
        lastThree.unshift(randIndex)
        while (lastThree.length > 3) {
            lastThree.pop()
        }
    }, [page])

    async function getItems(db: Firestore) {
        const itemsCollection = collection(db, 'items');
        const itemsSnapShot = await getDocs(itemsCollection);
        const itemsArray: PageItemType[] = []
        itemsSnapShot.docs.forEach(doc => {
            const data = doc.data()
            const itemData: PageItemType = {
                id: data.id,
                page_id: data.page_id,
                published: data.published,
                title: data.title,
                content: data.content,
                icon_id: data.icon_id,
                image_id: data.image_id,
                image_caption: data.image_caption,
                image_url: data.image_url,
                link_name: data.link_name,
                link_ref: data.link_ref,
                docId: doc.id
            }
            itemsArray.push(itemData)
        })
        return itemsArray;
      }

    useEffect(() => {
        getItems(db).then(response => {
            response.forEach(item => {
                if (!allItems.includes(item)) {
                    setAllItems(prevItems => [...prevItems, item])
                }
            })
        })
    }, [])

    const style = {
        background: `no-repeat url(${randomBackground}) rgb(255, 253, 235) center bottom/101% fixed`,
    }

    const filteredPageItems: PageItemType[] = allItems.filter((item: PageItemType) => item.page_id === page.id)

    useEffect(() => {
        console.log(page)
    }, [page])
    return (
        <div className={"page " + page.route} style={style}>
            <Header pages={pages} />
            <div className="page-buttons-wrap">
                <AddPageModal />
                <DeletePageModal pages={pages} />
            </div>
            <div className="item-buttons-wrap">
                <AddItemModal page={page} pages={pages} />
            </div>
            <div className="page-content">
                {filteredPageItems && filteredPageItems.map(item => {
                    const content = (item: PageItemType) => {
                        if (item.content) {
                            console.log(ReactHtmlParser(item.content)[0])
                            return (ReactHtmlParser(item.content)[0])
                        } else {
                            return (<></>)
                        }
                    }
                    return (
                        <>
                            <div className='title-wrapper'>
                                {item.title ? 
                                <>
                                    {ReactHtmlParser(item.title)}
                                </> : 
                                <></>
                                }
                                <div className='item-controls-wrapper'>
                                    <EditItemModal item={item} pages={pages} page={page}/>
                                    <DeleteItemModal item={item} />
                                </div>
                            </div>
                            <div className="image-content-wrapper">
                                <div className="flex-col image-caption-wrapper">
                                    {item.image_url && 
                                    <img className="image-frame" src={item.image_url} width="" height="auto"></img>
                                }
                                    {item.image_caption && 
                                    <h3>
                                        {item.image_caption}
                                    </h3>
                                    }
                                </div>
                                {content(item)}
                            </div>
                            {item.link_name && item.link_ref &&
                            <a href={(!item.link_ref?.includes('http:') && !item.link_ref?.includes('https:')) ? `https://${item.link_ref}` : item.link_ref}>
                                {item.link_name}
                            </a>
                            }
                        </>
                    )
                })}
            </div>
        </div>
    )
}
