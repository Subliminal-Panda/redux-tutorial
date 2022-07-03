import { collection, DocumentData, Firestore, getDocs } from "firebase/firestore/lite"
import React, { useEffect, useState } from "react"
import { db, PageType } from "../../App"
import Header from "../header/header"
import { AddItemModal } from "../modals/add-item"
import "./page.scss"
// import { collection, doc, setDoc } from "firebase/firestore";

interface PageComponentProps {
    page: PageType
    pages: PageType[]
}

interface PageItemType {
    description?: string
    icon_id?: number
    image_id?: number
    image_title?: string
    image_url?: string
    link_name?: string
    link_ref?: string
    order?: number
    page_id?: number
    published?: boolean
    title?: string
}

export default function Page (props: PageComponentProps) {
    const { page, pages } = props
    const [allItems, setAllItems] = useState<DocumentData[]>([] as PageItemType[])

    const trees1 = 'https://i.imgur.com/UoD91zv.png'
    const trees2 = 'https://i.imgur.com/D9no82p.png'
    const trees3 = 'https://i.imgur.com/TbfzchU.png'
    const trees4 = 'https://i.imgur.com/HHmiQm3.png'
    const trees5 = 'https://i.imgur.com/oiIZuLm.png'

    const [ backgroundArray ] = useState([ trees1, trees2, trees3, trees4, trees5 ])
    const [ bgOptions ] = useState([0,1,2,3,4])
    const [ lastThree ] = useState([57])
    const [ randomBackground, setRandomBackground ] = useState(backgroundArray[0])
    
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
        const itemsList = itemsSnapShot.docs.map(doc => doc.data());
        return itemsList;
      }

    useEffect(() => {
        getItems(db).then(response => {
            response.forEach(item => {
                if (!allItems.includes(item)) {
                    setAllItems(prevItems => [...prevItems, item])
                    console.log('item added:', item)
                }
            })
        })
    }, [])
    useEffect(() => {
        console.log('all items changed.', allItems)
    }, [allItems.length])

    const style = {
        background: `no-repeat url(${randomBackground}) rgb(255, 253, 235) center bottom/101% fixed`,
    }

    const filteredPageItems: PageItemType[] = allItems.filter((item: PageItemType) => item.page_id === page.id)

    return (
        <div className={"page " + page.route} style={style}>
            <Header pages={pages} />
            <div className="page-content">
                <AddItemModal page={page} />
                {filteredPageItems && filteredPageItems.map(item => {
                    return (
                        <>
                            {item.title && 
                            <h1>
                                {item.title}
                            </h1>
                            }
                            {item.description && 
                            <p>
                                {item.description}
                            </p>
                            }
                            <div className="flex-col">
                                {item.image_url && 
                                <img className="image-frame" src={item.image_url} width="500" height="auto"></img>
                                }
                                {item.image_title && 
                                <h3>
                                    {item.image_title}
                                </h3>
                                }
                            </div>
                            {item.link_name && item.link_ref && 
                            <a href={item.link_ref}>
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
