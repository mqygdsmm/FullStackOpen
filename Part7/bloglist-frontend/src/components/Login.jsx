import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { loginWith } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import Message from "./Message";

const Login = () => {
  const username = useField("text");
  const password = useField("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginWith(username.props.value, password.props.value));
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center text-4xl w-screen">
      <h1 className="font-semibold mb-16 text-5xl">
        Log in{" "}
        <span className="relative">
          <span className="block absolute -inset-1 -skew-y-3 bg-blue-300"></span>
          <span className="relative  text-white">blog</span>
        </span>
        {/* <span> app</span> */}
      </h1>
      <form
        data-testid="login"
        onSubmit={handleLogin}
        className="mt-24 flex flex-col  items-center self-center"
      >
        <div className="relative mb-16 w-2/3">
          <input
            id="username"
            {...username.props}
            className="peer w-full h-10 border-b-2 border-grey-300 text-grey-900 focus:outline-none focus:border-sky-500 placeholder-transparent"
            required
            placeholder="username"
          />
          <label
            htmlFor="username"
            className="absolute left-0 -top-12 text-gray-600 text-xl peer-placeholder-shown:text-2xl peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-0 transition-all italic"
          >
            username
          </label>
        </div>
        <div className="relative w-2/3">
          <input
            id="password"
            {...password.props}
            className="peer w-full h-10 border-b-2 border-grey-300 text-grey-900 focus:outline-none focus:border-sky-500 placeholder-transparent"
            placeholder="password"
            required
          />
          <label
            htmlFor="password"
            className="absolute left-0 -top-12 text-gray-600 text-xl peer-placeholder-shown:text-2xl peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-0 transition-all italic"
          >
            password
          </label>
        </div>
        <Message />
        <button
          type="submit"
          className="peer mt-12  p-2 bg-blue-400 rounded-md w-64 text-white font-medium focus:outline-none hover:bg-blue-500 active:bg-blue-600 shadow-md shadow-blue-400/50"
        >
          Login
        </button>
        <p className="text-lg text-center mt-3">
          Don't have an account?{" "}
          <a href="/register" className="underline">
            sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
