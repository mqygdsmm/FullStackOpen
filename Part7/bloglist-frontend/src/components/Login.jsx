import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { loginWith } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const username = useField("text");
  const password = useField("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginWith(username.props.value, password.props.value));
    username.resetField();
    password.resetField();
    navigate("/");
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
