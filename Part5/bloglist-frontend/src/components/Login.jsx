const Login = ({username, password, onUsernameChange, onPasswordChange, handleLogin}) => {
    return (
        <div>
            <h1>Log in  to application</h1>
            <form onSubmit={handleLogin}>
                <div>
                    username <input type="text" value={username} onChange={onUsernameChange} />
                </div>
                <div>
                    password <input type="text" value={password} onChange={onPasswordChange} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login