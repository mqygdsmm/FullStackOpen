import { useSelector } from "react-redux";

const Message = () => {
  const message = useSelector((state) => state.notification);
  if (message === null) {
    return null;
  }
  const { type, content } = message;
  const errorClassName = "text-red-500 text-lg italic mt-5";
  const successClassName = "text-lime-500 text-lg italic mt-5";
  if (type === "success") {
    return <div className={successClassName}>{content}</div>;
  }
  return <div className={errorClassName}>{content}</div>;
};

export default Message;
