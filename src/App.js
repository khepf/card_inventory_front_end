import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddInventory from "./components/AddInventory";
import Inventory from "./components/Inventory";
import InventorysList from "./components/InventorysList";
import TheFooter from "./components/TheFooter";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/inventorys" className="navbar-brand">
          Card Inventory
        </a>
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

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/inventorys"]} component={InventorysList} />
          <Route exact path="/add" component={AddInventory} />
          <Route path="/inventorys/:id" component={Inventory} />
        </Switch>
      </div>

      <TheFooter />
    </div>
  );
}

export default App;
