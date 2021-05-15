import React, { useState, useEffect } from "react";
import { getAll } from "../services/InventoryService";
import { Link } from "react-router-dom";
import dayjs from 'dayjs'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  dataGrid: {
    background: "linear-gradient(45deg, #797cd4 30%, #2b31e0 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  titleInventoryList: {
    textAlign: "center",
    marginBottom: "15px"
  },
  titleSelectedPlayer: {
    textAlign: "center",
    marginTop: "15px",
    marginBottom: "15px"
  }
});

const InventorysList = (props) => {
  const [inventorys, setInventorys] = useState([]);
  const [currentInventory, setCurrentInventory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const classes = useStyles();

  useEffect(() => {
    retrieveInventorys();
  }, []);
  
  

  const retrieveInventorys = () => {
    const accountInfo = props.info ? props.info : {};
    console.log("accountInfo from inside retrieveInventorys", accountInfo);
    getAll(accountInfo)
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
    { field: 'year', headerName: 'Year', width: 81},
    { field: 'brand', headerName: 'Brand', width: 100},
    { field: 'first_name', headerName: 'First Name', width: 130},
    { field: 'last_name', headerName: 'Last Name', width: 130},
    { field: 'card_number', headerName: 'Card #', width: 100},
    { field: 'card_condition', headerName: 'Condition', width: 120},
    { field: 'buy_date', headerName: 'Buy Date', width: 200},
    { field: 'buy_price', headerName: 'Buy Price', width: 115}
];


  return (
    <>
    <div className="row">
  
    <div className="col-md-12" style={{ height: 400, width: '100%' }}>
    <h4 className={classes.titleInventoryList}>Inventory List</h4>
      <DataGrid 
      rows={inventorys} 
      columns={columns} 
      getRowId={(row) => row.baseball_card_id} pageSize={100}
      onRowClick={(rowData) => setActiveInventory(rowData.row, rowData.baseball_card_id)}
      className={classes.dataGrid} />
    </div>

    </div>

    <div className="row" style={{"marginTop": "40px"}}>
    <div className="col-md-12">
        {currentInventory ? (
          <div>
            <h4 className={classes.titleSelectedPlayer}>Selected Player</h4>
   

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

     
            <Button component={ Link } to={"/inventorys/" + currentInventory.baseball_card_id} variant="contained" color="primary">
    Edit
</Button>
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