import React from "react"
import { Link } from "react-router-dom";
import { AddPageModal } from "../modals/add-page";
import './header.scss';

export const Links: string[] = ["First", "Second", "Third", "About", "Contact"]

export const Header = () => {
    return (
      <div className="header-wrap">
        <div className="header">
          <AddPageModal />
          <div className="header-title-wrap">
            <div className="header-title">
              <h1>
                React Redux Tutorial Site
              </h1>
            </div>
          </div>
          <div className="nav-links-wrap">
            {Links && Links.map(link => {
              return (
                <Link className="nav-link" to={"/" + link}>{link}</Link>
                )
              })}
          </div>
        </div>
      </div>
    )
}
