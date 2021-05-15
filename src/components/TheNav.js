import { Link } from "react-router-dom";
import { logoutFromServer} from "../services/InventoryService";

const TheNav = () => {

  const logout = () => {
    logoutFromServer().then(response => {
      console.log('logout', response);
    })
    .catch(e => {
      console.log(e);
    });
  }

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
      <li className="nav-item">
        <Link to={"/login"} className="nav-link" onClick={logout}>
          Log Out
        </Link>
      </li>
    </div>
  </nav>
)
}

export default TheNav;