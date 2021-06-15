import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom';

function MyProfile() {
    return (
        <>
        <h1>
            Your Profile
        </h1>
        <h3>
            Name:
        </h3>
        <h3>
            Faculty:
        </h3>
        <h3>
            Year:
        </h3>
        <h3>
            Modules:
        </h3>
        <h3>
            Status:
        </h3>
        <Button 
        style = {{background: "#4952ff", color: "white"}}
        variant = "contained"
        component = {Link} 
        to = '/ProfileCreation'>
            Edit Profile
        </Button>
        </>

    )
}

export default MyProfile;