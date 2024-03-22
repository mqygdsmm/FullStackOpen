const Login = ({ username, password, onUsernameChange, onPasswordChange, handleLogin }) => {
  return (
    <div>
      <h1>Log in  to application</h1>
      <form data-testId='login' onSubmit={handleLogin}>
        <div>
            username <input type="text" data-testId='username' value={username} onChange={onUsernameChange} />
        </div>
        <div>
            password <input type="password" data-testId='password' value={password} onChange={onPasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login