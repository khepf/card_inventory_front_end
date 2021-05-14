import { Link } from "react-router-dom";

const TheNav = () => {
return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
    <div className="navbar-brand">
      Card Inventory
    </div>
    <div className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link to={"/inventorys"} className="nav-link">
          Inventory
        </Link>
      </li>
      <li className="nav-item">
        <Link to={"/add"} className="nav-link">
          Add
        </Link>
      </li>
    </div>
  </nav>
)
}

export default TheNav;