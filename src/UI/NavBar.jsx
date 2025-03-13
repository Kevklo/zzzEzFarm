import { Link } from "react-router-dom"


export const NavBar = () => {
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">zzzEzFarm</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/characteradder">Add Character</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/itemsadder">Add Items</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/charactergrid">Character Grid</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Your Characters</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/itemsinventory">Your Items</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  ) 
}

