import React, { useState } from "react";
import { create } from "../services/InventoryService";
import DatePicker from "react-datepicker";
import Button from "@material-ui/core/Button";

import "react-datepicker/dist/react-datepicker.css";

const AddInventory = (props) => {
  const initialInventoryState = {
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
    card_image_back: "",
    account_number: "",
    account_token: "",
  };
  const [inventory, setInventory] = useState(initialInventoryState);
  const [submitted, setSubmitted] = useState(false);
  const [buyDate, setBuyDate] = useState("");
  const [sellDate, setSellDate] = useState("");

  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const [fileInputState2, setFileInputState2] = useState("");
  const [previewSource2, setPreviewSource2] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInventory({ ...inventory, [name]: value });
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
      alert("Your image is too large");
    } else {
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
    }
  };

  const previewFile2 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    if (file.size > 500000) {
      alert("Your image is too large");
    } else {
      reader.onloadend = () => {
        setPreviewSource2(reader.result);
      };
    }
  };

  const saveInventory = (event) => {
    const accountInfo = props.info ? props.info : {};
    console.log("accountInfo from inside saveInventorys", accountInfo);
    if (event) event.preventDefault();
    var data = {
      brand: inventory.brand,
      buy_date: buyDate,
      buy_price: inventory.buy_price,
      card_condition: inventory.card_condition,
      card_number: inventory.card_number,
      description: inventory.description,
      first_name: inventory.first_name,
      last_name: inventory.last_name,
      profit_loss: inventory.profit_loss,
      sell_date: sellDate,
      sell_price: inventory.sell_price,
      year: inventory.year,
      card_image_front: previewSource,
      card_image_back: previewSource2,
      account_number: accountInfo.account_number,
      account_token: accountInfo.token,
    };

    create(data)
      .then((response) => {
        setInventory({
          brand: response.data.brand,
          buy_date: response.data.buy_date,
          buy_price: response.data.buy_price,
          card_condition: response.data.card_condition,
          card_number: response.data.card_number,
          description: response.data.description,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          profit_loss: response.data.profit_loss,
          sell_date: response.data.sell_date,
          sell_price: response.data.sell_price,
          year: response.data.year,
          card_image_front: response.data.card_image_front,
          card_image_back: response.data.card_image_back,
        });
        setSubmitted(true);
        setFileInputState("");
        setPreviewSource("");
        setFileInputState2("");
        setPreviewSource2("");
        props.history.push("/inventorys");
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newInventory = () => {
    setInventory(initialInventoryState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newInventory}>
            Add
          </button>
        </div>
      ) : (
        <form onSubmit={saveInventory}>
          <div>
            <h5>*Images must be less than 500k in size</h5>
          </div>
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              type="text"
              className="form-control"
              id="year"
              required
              value={inventory.year}
              onChange={handleInputChange}
              name="year"
            />
          </div>

          <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              className="form-control"
              id="brand"
              required
              value={inventory.brand}
              onChange={handleInputChange}
              name="brand"
            />
          </div>

          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              required
              value={inventory.first_name}
              onChange={handleInputChange}
              name="first_name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              required
              value={inventory.last_name}
              onChange={handleInputChange}
              name="last_name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="card_number">Card Number</label>
            <input
              type="text"
              className="form-control"
              id="card_number"
              required
              value={inventory.card_number}
              onChange={handleInputChange}
              name="card_number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="card_condition">Card Condition</label>
            <input
              type="text"
              className="form-control"
              id="card_condition"
              required
              value={inventory.card_condition}
              onChange={handleInputChange}
              name="card_condition"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={inventory.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="buy_date">Buy Date</label>
            <DatePicker
              selected={buyDate}
              onChange={(date) => setBuyDate(date)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="buy_price">Buy Price</label>
            <input
              type="text"
              className="form-control"
              id="buy_price"
              required
              value={inventory.buy_price}
              onChange={handleInputChange}
              name="buy_price"
            />
          </div>

          <div className="form-group">
            <label htmlFor="sell_date">Sell Date</label>
            <DatePicker
              selected={sellDate}
              onChange={(date) => setSellDate(date)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="sell_price">Sell Price</label>
            <input
              type="text"
              className="form-control"
              id="sell_price"
              value={inventory.sell_price}
              onChange={handleInputChange}
              name="sell_price"
            />
          </div>

          <div className="form-group">
            <label htmlFor="profit_loss">Profit / Loss</label>
            <input
              type="text"
              className="form-control"
              id="profit_loss"
              value={inventory.profit_loss}
              onChange={handleInputChange}
              name="profit_loss"
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

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <div>
            {previewSource && (
              <img
                src={previewSource}
                alt="front of card"
                style={{ height: "300px" }}
              />
            )}
          </div>

          <div>
            {previewSource2 && (
              <img
                src={previewSource2}
                alt="back of card"
                style={{ height: "300px" }}
              />
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default AddInventory;
