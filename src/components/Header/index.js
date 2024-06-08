import './index.css'
import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="home-web-logo"
        />
      </Link>
      <ul className="links-container">
        <Link to="/">
          <li>
            <button type="button" className="link-btn">
              Home
            </button>
          </li>
        </Link>
        <Link to="/jobs">
          <li>
            <button type="button" className="link-btn">
              Jobs
            </button>
          </li>
        </Link>
      </ul>
      <ul className="mobile-nav-links-container">
        <Link to="/">
          <li>
            {/* eslint-disable-next-line */}
            <button type="button" className="mobile-link-btn">
              <AiFillHome />
            </button>
          </li>
        </Link>
        <Link to="/jobs">
          <li>
            {/* eslint-disable-next-line */}
            <button type="button" className="mobile-link-btn">
              <BsFillBriefcaseFill />
            </button>
          </li>
        </Link>
        <li>
          {/* eslint-disable-next-line */}
          <button type="button" className="mobile-link-btn" onClick={logout}>
            <FiLogOut />
          </button>
        </li>
      </ul>

      <button type="button" className="logout-button" onClick={logout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
