import React, { useState, useEffect } from "react";
import {get, update, remove} from "../services/InventoryService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components'

const Inventory = props => {
  const initialInventoryState = {
    baseball_card_id: "",
    brand: "",
    buy_date: "",
    buy_price: "",
    card_condition: "",
    card_number: "",
    description: "",
    first_name: "",
    last_name: "",
    profit_loss: "",
    sell_date: "",
    sell_price: "",
    year: "",
    card_image_front: "",
    card_image_back: ""
  };
  const [currentInventory, setCurrentInventory] = useState(initialInventoryState);
  const [buyDate, setBuyDate] = useState(new Date());
  const [sellDate, setSellDate] = useState(new Date());
  const [message, setMessage] = useState("");

  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');

  const [fileInputState2, setFileInputState2] = useState('');
  const [previewSource2, setPreviewSource2] = useState('');

  const getInventory = id => {
    get(id)
      .then(response => {
        response.data.buy_date = response.data.buy_date ? new Date(response.data.buy_date) : null;
        response.data.sell_date = response.data.sell_date ? new Date(response.data.sell_date) : null;
        setCurrentInventory(response.data);
        console.log('getInventory', response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log('inside useEffect on Inventory page')
    getInventory(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentInventory({ ...currentInventory, [name]: value });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);

    // setSelectedFile(file);
    // setFileInputState(e.target.value);
};

const handleFileInputChange2 = (e) => {
  const file = e.target.files[0];
  previewFile2(file);
  
  // setSelectedFile(file);
  // setFileInputState(e.target.value);
};

const previewFile = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  if (file.size > 500000) {
    alert("Your image is too large")
  }
  else {
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setCurrentInventory({...currentInventory, card_image_front: previewSource});
      console.log(reader.result);
      
  }
  };
};

const previewFile2 = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  if (file.size > 500000) {
    alert("Your image is too large")
  }
  else {
    reader.onloadend = () => {
      setPreviewSource2(reader.result);
      setCurrentInventory({...currentInventory, card_image_back: previewSource2});
      
  }
  };
};

  const handleBuyDate = date => {
    setBuyDate(date);
    setCurrentInventory({...currentInventory, buy_date: date});
  }

  const handleSellDate = date => {
    setSellDate(date);
    setCurrentInventory({...currentInventory, sell_date: date});
  }



  const updateInventory = () => {
    update(currentInventory)
      .then(response => {
        console.log(response.data);
        setMessage("The inventory was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteInventory = () => {
    remove(currentInventory.baseball_card_id, currentInventory.front_public_id, currentInventory.back_public_id)
      .then(response => {
        console.log(response.data);
        props.history.push("/inventorys");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentInventory ? (
        <div className="edit-form">
          <h4>Inventory</h4>
          <form>
            <div className="form-group">
              <label htmlFor="year">Year</label>
              <input
                type="text"
                className="form-control"
                id="year"
                name="year"
                value={currentInventory.year}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                className="form-control"
                id="brand"
                name="brand"
                value={currentInventory.brand}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={currentInventory.first_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={currentInventory.last_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="card_number">Card Number</label>
              <input
                type="text"
                className="form-control"
                id="card_number"
                name="card_number"
                value={currentInventory.card_number}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="card_condition">Card Condition</label>
              <input
                type="text"
                className="form-control"
                id="card_condition"
                name="card_condition"
                value={currentInventory.card_condition}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentInventory.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="buy_date">Buy Date</label>
              <DatePicker
                selected={currentInventory.buy_date}
                onChange={handleBuyDate}
                />
            </div>
            <div className="form-group">
              <label htmlFor="buy_price">Buy Price</label>
              <input
                type="text"
                className="form-control"
                id="buy_price"
                name="buy_price"
                value={currentInventory.buy_price}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="buy_date">Sell Date</label>
              <DatePicker
                selected={currentInventory.sell_date}
                onChange={handleSellDate}
                />
            </div>
            <div className="form-group">
              <label htmlFor="sell_price">Sell Price</label>
              <input
                type="text"
                className="form-control"
                id="sell_price"
                name="sell_price"
                value={currentInventory.sell_price}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="profit_loss">Profit / Loss</label>
              <input
                type="text"
                className="form-control"
                id="profit_loss"
                name="profit_loss"
                value={currentInventory.profit_loss}
                onChange={handleInputChange}
                disabled
              />
            </div>

            <div className="form-group">
            <label htmlFor="card_image_front">Front of Card</label>
            <input
              type="file"
              className="form-control"
              id="card_image_front"
              name="card_image_front"
              onChange={handleFileInputChange}
              value={fileInputState}
            />
          </div>
          <div>
                <img src={currentInventory.card_image_front} alt="" style={{ "maxWidth": "150px" }}/>
               
            </div>

          <div className="form-group">
            <label htmlFor="card_image_back">Back of Card</label>
            <input
              type="file"
              className="form-control"
              id="card_image_back"
              name="card_image_back"
              onChange={handleFileInputChange2}
              value={fileInputState2}
            />
          </div>
          <div>
             
                <img src={currentInventory.card_image_back} alt="" style={{ "maxWidth": "150px" }}/>
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteInventory}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateInventory}
          >
            Update
          </button>
          <div>{previewSource && (
            <img src={previewSource} alt="front of card" style={{height: '150px'}}/>
          )}</div>
          
          <div>{previewSource2 && (
            <img src={previewSource2} alt="back of card" style={{height: '150px'}}/>
          )}</div>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on an Inventory...</p>
        </div>
      )}
    </div>
  );
};

export default Inventory;