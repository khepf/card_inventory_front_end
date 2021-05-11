import React, { useState, useEffect } from "react";
import { getAll } from "../services/InventoryService";
import { Link } from "react-router-dom";
import dayjs from 'dayjs'
import { DataGrid } from '@material-ui/data-grid';

const InventorysList = () => {
  const [inventorys, setInventorys] = useState([]);
  const [currentInventory, setCurrentInventory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveInventorys();
  }, []);
  

  const retrieveInventorys = () => {
    getAll()
      .then(response => {
        setInventorys(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const setActiveInventory = (inventory, index) => {
    setCurrentInventory(inventory);
    setCurrentIndex(index);
  };

  const columns = [
    { field : 'year', headerName: 'Year'},
    { field : 'brand', headerName: 'Brand'},
    { field : 'first_name', headerName: 'First Name'},
    { field : 'last_name', headerName: 'Last Name'},
    { field : 'card_number', headerName: 'Card Number'},
    { field : 'card_condition', headerName: 'Card Condition'}
];


  return (
    <>
    <div className="row">
  
    <div className="col-md-12" style={{ height: 400, width: '100%' }}>
    <h4>Card Inventory</h4>
      <DataGrid 
      rows={inventorys} 
      columns={columns} 
      getRowId={(row) => row.baseball_card_id} pageSize={100}
      onRowClick={(rowData) => setActiveInventory(rowData.row, rowData.baseball_card_id)} />
    </div>

    </div>

    <div className="row" style={{"marginTop": "40px"}}>
    <div className="col-md-12">
        {currentInventory ? (
          <div>
            <h4>Selected Player</h4>
   

            <div>
              <img src={currentInventory.card_image_front} alt="" style={{ "maxWidth": "300px", "margin": "10px"}}/>
              <img src={currentInventory.card_image_back} alt="" style={{ "maxWidth": "300px", "margin": "10px"}}/>
            </div>


            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentInventory.description}
            </div>
            <div>
              <label>
                <strong>Buy Date:</strong>
              </label>{" "}
              {dayjs(currentInventory.buy_date).format('MM/DD/YYYY')}
            </div>
            <div>
              <label>
                <strong>Buy Price:</strong>
              </label>{" "}
              {'$' + currentInventory.buy_price}
            </div>
            <div>
              <label>
                <strong>Sell Date:</strong>
              </label>{" "}
              {dayjs(currentInventory.sell_date).format('MM/DD/YYYY')}
            </div>
            <div>
              <label>
                <strong>Sell Price:</strong>
              </label>{" "}
              {'$' + currentInventory.sell_price}
            </div>
            <div>
              <label>
                <strong>Profit / Loss:</strong>
              </label>{" "}
              {'$' + currentInventory.profit_loss}
            </div>

     

            <Link
              to={"/inventorys/" + currentInventory.baseball_card_id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Inventory Item...</p>
          </div>
        )}
      </div>
  

    </div>

    </>

  );
};

export default InventorysList;