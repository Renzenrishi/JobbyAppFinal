import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    userInputVal: '',
    passwordInputVal: '',
    errorMsg: '',
    showSubmitError: '',
  }

  setCookies = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})

    const {history} = this.props
    history.replace('/')
  }

  verifyUser = async event => {
    event.preventDefault()

    const {userInputVal, passwordInputVal} = this.state

    const userDetails = {
      username: userInputVal,
      password: passwordInputVal,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)

    const data = await response.json()

    if (response.ok) {
      this.setCookies(data.jwt_token)
    } else {
      this.setState({showSubmitError: true, errorMsg: data.error_msg})
    }
  }

  getUsername = event => {
    this.setState({userInputVal: event.target.value})
  }

  getPassword = event => {
    this.setState({passwordInputVal: event.target.value})
  }

  renderUserName = () => {
    const {userInputVal} = this.state

    return (
      <>
        <label htmlFor="username" className="login-label">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          value={userInputVal}
          placeholder="Username"
          className="login-input-bar"
          onChange={this.getUsername}
        />
      </>
    )
  }

  renderPassword = () => {
    const {passwordInputVal} = this.state

    return (
      <>
        <label htmlFor="password" className="login-label">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          value={passwordInputVal}
          placeholder="Password"
          className="login-input-bar"
          onChange={this.getPassword}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container-page">
        <div className="content">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="web-logo"
          />
          <form onSubmit={this.verifyUser} className="login-form-container">
            {this.renderUserName()}
            {this.renderPassword()}
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
