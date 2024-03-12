const Message = ({message}) => {
    const messageStyle = {
        color: 'green',
        fontSize: 24,
        background:'lightgrey',
        borderStyle:'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
    if (message === null) {
        return null
    }
    else {
        return (<div style={messageStyle}>{message}</div>)
    }
}

export default Message