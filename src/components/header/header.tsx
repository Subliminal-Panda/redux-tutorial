import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { AddPageModal } from "../modals/add-page";
import './header.scss';
import { PageType } from "../../App";


interface HeaderComponentProps {
  pages: PageType[]
}
export default function Header (props: HeaderComponentProps) {
  const { pages } = props
  const [sortedPages, setSortedPages] = useState<PageType[]>([])

    // const doc = document.documentElement;
    // const w = window;
  
    // let prevScroll = w.scrollY || doc.scrollTop;
    // let curScroll;
    // let direction = 0;
    // let prevDirection = 0;
  
    // const header = document.getElementById('nav-links-toggle');
  
    // const checkScroll = () => {
  
    //   /*
    //   ** Find the direction of scroll
    //   ** 0 - initial, 1 - up, 2 - down
    //   */
  
    //   curScroll = w.scrollY || doc.scrollTop;
    //   if (curScroll > prevScroll) { 
    //     //scrolled up
    //     direction = 2;
    //   }
    //   else if (curScroll < prevScroll) { 
    //     //scrolled down
    //     direction = 1;
    //   }
  
    //   if (direction !== prevDirection && header) {
    //     toggleHeader(direction, curScroll, header);
    //     console.log('header toggling!')
    //   }
      
    //   prevScroll = curScroll;
    // };
  
    // const toggleHeader = (direction: number, curScroll: number, header: HTMLElement) => {
    //   if (direction === 2 && curScroll > 52) { 
        
    //     //replace 52 with the height of your header in px
  
    //     header.classList.add('hide');
    //     prevDirection = direction;
    //   }
    //   else if (direction === 1) {
    //     header.classList.remove('hide');
    //     prevDirection = direction;
    //   }
    // }

    
    // window.addEventListener('scroll', checkScroll);
  useEffect (() => {
    setSortedPages(pages.sort((a, b) => a.id - b.id));
  }, [pages])
  
    return (
      <div className="header-wrap" id="nav-links-toggle">

        <div className="header">
          <div className="header-title-wrap">
            <div className="header-title">
              <h1>
                Tyler Mortenson-Hayes
              </h1>
            </div>
          </div>
          <div className="nav-links-wrap" >
            {sortedPages && sortedPages.map(page => {
              if (typeof page.title === "string" && typeof page.route === "string") {
                return (
                  <NavLink className="nav-link" to={"/" + page.route}>{page.title}</NavLink>
                  )
                }
              })}
          </div>
        </div>
      </div>
    )
}
