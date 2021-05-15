import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import { loginToServer, testRoute } from "../services/InventoryService";
import BackgroundImage from '../images/cards_o_25.jpg'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundImage: `url(${BackgroundImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
    '::before': {
      border: '2px solid red'
    }
  },
}));

const TheLogin = (props) => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm();
  const [currentAccountInfo, setCurrentAccountInfo] = useState({});

  const onSubmit = data => {
    console.log(data);
    loginToServer(data).then(response => {
      console.log('login post response', response)
      setCurrentAccountInfo(response.data);
      props.parentCallback(response.data);
      props.history.push("/inventorys");
    })
    .catch(e => {
      console.log(e);
    });
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)} method="post">
      <Controller
        name="username"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="User Name"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: 'User name required' }}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Password"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="password"
          />
        )}
        rules={{ required: 'Password required' }}
      />
      <div>
      <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <Button variant="contained" color="primary">
          Cancel
        </Button>

      </div>
    </form>
  );
};

export default TheLogin;