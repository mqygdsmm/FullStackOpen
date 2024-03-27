import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { loginWith } from "../reducers/userReducer";
import { showNotification } from "../reducers/notificationReducer";

const Login = () => {
  const username = useField("text");
  const password = useField("password");
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    try {
      dispatch(loginWith(username.props.value, password.props.value));
      username.resetField();
      password.resetField();
    } catch (exception) {
      dispatch(
        showNotification({
          type: "error",
          content: "invalid username or password",
        })
      );
    }
  };

  return (
    <div>
      <h1>Log in to application</h1>
      <form data-testid="login" onSubmit={handleLogin}>
        <div>
          username <input {...username.props} />
        </div>
        <div>
          password <input {...password.props} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
