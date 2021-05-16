import React, { useState } from "react";
import { create } from "../services/InventoryService";
import DatePicker from "react-datepicker";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
  },
  formChildren: {
    flexGrow: 1,
    margin: "10px",
  },
  buttonsDiv: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "10px"
  },
});

const AddInventory = (props) => {
  const classes = useStyles();

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
    <div className={classes.form}>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newInventory}>
            Add
          </button>
        </div>
      ) : (
        <form onSubmit={saveInventory}>
          <TextField
            className={classes.formChildren}
            label="year"
            id="year"
            required
            value={inventory.year}
            onChange={handleInputChange}
            name="year"
          />

          <TextField
            className={classes.formChildren}
            label="brand"
            id="brand"
            required
            value={inventory.brand}
            onChange={handleInputChange}
            name="brand"
          />

          <TextField
            className={classes.formChildren}
            label="first name"
            id="first_name"
            required
            value={inventory.first_name}
            onChange={handleInputChange}
            name="first_name"
          />

          <TextField
            className={classes.formChildren}
            label="last name"
            id="last_name"
            required
            value={inventory.last_name}
            onChange={handleInputChange}
            name="last_name"
          />

          <TextField
            className={classes.formChildren}
            label="card #"
            id="card_number"
            required
            value={inventory.card_number}
            onChange={handleInputChange}
            name="card_number"
          />

          <TextField
            className={classes.formChildren}
            label="condition"
            id="card_condition"
            required
            value={inventory.card_condition}
            onChange={handleInputChange}
            name="card_condition"
          />

          <TextField
            className={classes.formChildren}
            label="description"
            id="description"
            required
            value={inventory.description}
            onChange={handleInputChange}
            name="description"
          />

          <div className={classes.formChildren}>
            <label htmlFor="buy_date">buy date</label>
            <DatePicker
              selected={buyDate}
              onChange={(date) => setBuyDate(date)}
            />
          </div>

          <TextField
            className={classes.formChildren}
            label="buy price"
            id="buy_price"
            required
            value={inventory.buy_price}
            onChange={handleInputChange}
            name="buy_price"
          />
          <div className={classes.formChildren}>
            <label htmlFor="sell_date">sell date</label>
            <DatePicker
              selected={sellDate}
              onChange={(date) => setSellDate(date)}
            />
          </div>

          <TextField
            className={classes.formChildren}
            label="sell price"
            id="sell_price"
            value={inventory.sell_price}
            onChange={handleInputChange}
            name="sell_price"
          />

          <TextField
            className={classes.formChildren}
            label="profit/loss"
            id="profit_loss"
            value={inventory.profit_loss}
            onChange={handleInputChange}
            name="profit_loss"
            disabled
          />

          <div className={classes.formChildren}>
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

          <div className={classes.formChildren}>
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
<div className={classes.formChildren, classes.buttonsDiv}>
<Button
            type="submit"
            variant="contained"
            color="primary"
            
  
          >
            Submit
          </Button>
          <Button
              component={Link}
              to={"/inventorys/"}
              variant="contained"
              color="primary"
            
        
      
            >
              Cancel
            </Button>
</div>
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
