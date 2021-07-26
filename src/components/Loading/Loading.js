import logo from '../../modfriend.png';
import styles from './Loading.module.css';

export default function Loading() {
    return (
        <div className = {styles.padding}>
          <center>
          <img src = {logo} alt = "modFriend logo" 
          height = "138" width = "375">
          </img>
        <h1>
            Loading...
        </h1>
        </center>
        </div>
    )

}