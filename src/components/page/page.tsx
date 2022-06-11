import React, { useEffect, useState } from "react"
import { Header } from "../header/header"
import { AddItemModal } from "../modals/add-item"
import "./page.scss"

interface PageComponentProps {
    pageName: string
}

export const Page = (props: PageComponentProps) => {
    const { pageName } = props

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
    }, [pageName])

    const style = {
        background: `no-repeat url(${randomBackground}) rgb(255, 253, 235) center bottom/101% fixed`,
    }

    return (
        <div className={"page " + pageName} style={style}>
            <Header />
            <div className="page-content">
            <AddItemModal pageName={pageName} />
                <h1>
                    {pageName} page item 1 heading
                </h1>
                <p>
                    {pageName} page item 1 content Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
                <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                </p>
                <h1>
                    {pageName} page item 2 heading
                </h1>
                <p>
                    {pageName} page item 2 content Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
                <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                </p>
                <h1>
                    {pageName} page item 3 heading
                </h1>
                <p>
                    {pageName} page item 3 content Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
                <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                </p>
                <h1>
                    {pageName} page item 4 heading
                </h1>
                <p>
                    {pageName} page item 4 content Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
                <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                </p>
            </div>
        </div>
    )
}
