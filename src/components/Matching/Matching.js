import logo from '../../modfriend.png';
import { Button, FormControlLabel, Switch } from "@material-ui/core";
import React from 'react';

function Matching() {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

    return (
        <div>
          <center>
          <img src = {logo} alt = "modFriend logo" 
          height = "200" width = "200">
          </img>
          <p />
          <h1>
              Welcome to modFriend!
          </h1>
          <Button variant = "contained" style = {{background: "#4952ff", color: "white"}}>
              Match!
            </Button>
            <p />
          
            <FormControlLabel
        control={
          <Switch
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Toggle Availability"
      />
          </center>

        </div>
    )
}

export default Matching;