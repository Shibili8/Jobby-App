import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="header-container">
      <li className="nav-list-item">
        <Link to="/" className="link-item">
          <img
            className="logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </Link>
      </li>
      <li className="link-container nav-link-item">
        <Link to="/" className="link-item">
          <p className="link-content">Home</p>
        </Link>
        <Link to="/jobs" className="link-item">
          <p className="link-content">Jobs</p>
        </Link>
      </li>
      <li className="nav-list-item">
        <button className="logout-button" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
