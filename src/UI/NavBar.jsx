import { NavLink } from "react-router-dom";

import React from 'react'

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">zzzEzFarm</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div 
        className={`collapse navbar-collapse`} id="collapsibleNavbar">
          <ul className="navbar-nav ms-auto">
            {[
              { to: "/characteradder", label: "Add Character" },
              { to: "/itemsadder", label: "Add Items" },
              { to: "/charactergrid", label: "Character Grid" },
              { to: "/", label: "Your Characters" },
              { to: "/itemsinventory", label: "Your Items" },
            ].map(({ to, label }) => (
              <li className="nav-item" key={to}>
                <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to={to}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}