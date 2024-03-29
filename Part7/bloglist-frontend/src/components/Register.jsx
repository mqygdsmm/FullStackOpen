import { useField } from "../hooks";
import usersServices from "../services/users";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
import { showNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const Registor = () => {
  const username = useField("text");
  const name = useField("text");
  const password = useField("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegistor = async (event) => {
    event.preventDefault();
    try {
      await usersServices.register({
        username: username.props.value,
        name: name.props.value,
        password: password.props.value,
      });
      dispatch(
        showNotification({
          type: "success",
          content: "registered your acccount successfully!",
        })
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
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
    <div className="h-screen flex flex-col justify-center items-center text-4xl">
      <h1 className="font-semibold mb-16 text-5xl">
        Sign up to{" "}
        <span className="relative">
          <span className="block absolute -inset-1 -skew-y-3 bg-blue-300"></span>
          <span className="relative  text-white">blog</span>
        </span>
        <span> app</span>
      </h1>
      <form data-testid="Register" onSubmit={handleRegistor} className="mt-24">
        <div className="relative mb-16">
          <input
            id="username"
            {...username.props}
            className="peer h-10 border-b-2 border-grey-300 text-grey-900 focus:outline-none focus:border-sky-500 placeholder-transparent"
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
        <div className="relative mb-16">
          <input
            id="name"
            {...name.props}
            className="peer h-10 border-b-2 border-grey-300 text-grey-900 focus:outline-none focus:border-sky-500 placeholder-transparent"
            placeholder="name"
            required
          />
          <label
            htmlFor="name"
            className="absolute left-0 -top-12 text-gray-600 text-xl peer-placeholder-shown:text-2xl peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-0 transition-all italic"
          >
            name
          </label>
        </div>
        <div className="relative">
          <input
            id="password"
            {...password.props}
            className="peer h-10 border-b-2 border-grey-300 text-grey-900 focus:outline-none focus:border-sky-500 placeholder-transparent"
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
          className="peer mt-12 ml-20 p-2 bg-blue-400 rounded-md w-64 text-white font-medium focus:outline-none hover:bg-blue-500 active:bg-blue-600 shadow-md shadow-blue-400/50"
        >
          Sign up
        </button>
        <p className="text-lg text-center mt-3">
          Already have an account?{" "}
          <a href="/login" className="underline">
            sign in
          </a>
        </p>
      </form>
    </div>
  );
};

export default Registor;
