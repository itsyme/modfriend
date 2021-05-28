
import logo from '../../modfriend.png';

function LoginBar() {
    return (
        <div>
          <center>
          <img src = {logo} alt = "modFriend logo" 
          height = "200" width = "200">
          </img>
        <h1>
          Welcome to modFriend!
        </h1>
        <p>
          <h2>
            Please login to continue
          </h2>
        </p>
        <p>
          <form>
            Username:
            <input type = "text">
            </input>
          <p>
            Password:
            <input type = "text">
            </input>
          </p>
            <button>
              Submit
            </button>

          </form>
        </p>
        <p>
        Log in with NUS:
        <button>
            Click here!
        </button>
        </p>
        </center>
    </div>
    )
}
export default LoginBar;