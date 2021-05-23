function LoginPage() {
    return (
        <div>
        <h1>
          Welcome to modFriend!
        </h1>
        <p>
          <h2>
            Login
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
    </div>
    )
}
export default LoginPage;