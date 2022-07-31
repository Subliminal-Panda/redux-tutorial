import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { AddPageModal } from "../modals/add-page";
import './header.scss';
import { PageType } from "../../App";


interface HeaderComponentProps {
  pages: PageType[]
}
export default function Header (props: HeaderComponentProps) {
  const { pages } = props
  const [sortedPages, setSortedPages] = useState<PageType[]>([])
  useEffect (() => {
    setSortedPages(pages.sort((a, b) => a.id - b.id));
  }, [pages])
  
    return (
      <div className="header-wrap">
        <div className="header">
          <AddPageModal />
          <div className="header-title-wrap">
            <div className="header-title">
              <h1>
                Tyler Mortenson's Portfolio
              </h1>
            </div>
          </div>
          <div className="nav-links-wrap">
            {sortedPages && sortedPages.map(page => {
              if (typeof page.title === "string" && typeof page.route === "string") {
                return (
                  <Link className="nav-link" to={"/" + page.route}>{page.title}</Link>
                  )
                }
              })}
          </div>
        </div>
      </div>
    )
}
