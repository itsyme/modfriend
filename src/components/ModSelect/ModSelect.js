import logo from '../../modfriend.png';
import { Box, Button, Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import styles from "./ModSelect.module.css";
import { Link } from 'react-router-dom';

function ModSelect() {
    const modules = [
        'CS1010S',
        'CS1101',
        'MA1101R'
    ]

    return (
        <div>
            <Box className = {styles.backButton}>
                <Button component = {Link} to = '/ProfileCreation'>
                    Back
                </Button>
            </Box>  
            <center>
          <img src = {logo} alt = "modFriend logo" 
          height = "200" width = "200">
          </img>
          <h1>
              Select your modules!
          </h1>
          <FormControl>
              <InputLabel>Modules</InputLabel>
              <Select multiple className = {styles.moduleBar}
              value = {modules}>
                  {modules.map((mod) => (
            <MenuItem key={mod} value={mod}>
              {mod}
            </MenuItem>
                  ))}

              </Select>
          </FormControl>

          </center>
        </div>

    )
}

export default ModSelect;