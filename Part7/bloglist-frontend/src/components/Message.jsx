import { useSelector } from "react-redux";

const Message = () => {
  const message = useSelector((state) => state.notification);
  if (message === null) {
    return null;
  }
  const { type, content } = message;
  const style = {
    fontSize: 24,
    border: "solid red",
    background: "lightgray",
    padding: 5,
    margin: 5,
    color: "red",
  };
  if (type === "success") {
    style.border = "solid green";
    style.color = "green";
  }
  return <div style={style}>{content}</div>;
};

export default Message;
