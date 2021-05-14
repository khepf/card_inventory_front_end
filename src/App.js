import React, { useState } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddInventory from "./components/AddInventory";
import Inventory from "./components/Inventory";
import InventorysList from "./components/InventorysList";
import TheFooter from "./components/TheFooter";
import TheLogin from "./components/TheLogin";
import TheNav from "./components/TheNav";

export const AppContext = React.createContext();

function App() {
  const [currentAccountInfo, setCurrentAccountInfo] = useState({});

  const callback = (info) => {
    console.log('app info in callback', info)
    setCurrentAccountInfo(info);
}
  return (
    <div>
      <TheNav />

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/"]}    render={(props) => (
            <TheLogin {...props} parentCallback={callback} />
            )}/>
          <Route exact path={["/inventorys"]} render={(props) => (
            <InventorysList {...props} info={currentAccountInfo} />
            )}/>
          <Route exact path={["/add"]} render={(props) => (
            <AddInventory {...props} info={currentAccountInfo} />
            )}/>
          <Route path="/inventorys/:id" component={Inventory} />
        </Switch>
      </div>

      <TheFooter />
    </div>
  );
}

export default App;
