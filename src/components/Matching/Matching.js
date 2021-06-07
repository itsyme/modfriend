import logo from '../../modfriend.png';
import { Button } from "@material-ui/core";

function Matching() {
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
          </center>

        </div>
    )
}

export default Matching;