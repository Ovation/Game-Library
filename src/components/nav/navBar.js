import React from "react"
import { Link } from "react-router-dom"
import "./navBar.css"

export const NavBar = (props) => {
  return (
    <nav className="navbar">

      <ul className="navbar">
        <li className="navbar__item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="navbar__item">
          <Link className="nav-link" to="/games">Games</Link>
        </li>
        <li className="navbar__item">
          <Link className="nav-link" to="/friends">Favorites</Link>
        </li>
      </ul>
    </nav>
  )
}
