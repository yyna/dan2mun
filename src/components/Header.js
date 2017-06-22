import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  render() {

    const loginButton = (
      <li>
        <Link to="/login">
          로그인
        </Link>
      </li>
    );
    const logoutButton = (
      <li>
        <a onClick={this.props.onLogout}>
          로그아웃
        </a>
      </li>
    );

    const adminButton = (
      <li>
        <Link to="/admin">
          관리자기능
        </Link>
      </li>
    );

    const errorReportButton = (
      <li>
        <Link to ="/reporterror">
          오류신고
        </Link>
      </li>
    );

    return (
      <nav>
        <div className="nav-wrapper grey darken-3 myNav">
          <Link to="/" className="brand-logo left">단<span id="two">2</span>문<span id="subtitle"> : 단군부터 문재인까지</span></Link>

          <div className="right">
            <ul>
              { (this.props.isAdmin && this.props.isLoggedIn) ? adminButton : errorReportButton }
              { this.props.isLoggedIn ? logoutButton : loginButton }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  isLoggedIn: React.PropTypes.bool,
  isAdmin: React.PropTypes.bool,
  onLogout: React.PropTypes.func
};

Header.defaultProps = {
  isLoggedIn: false,
  isAdmin: false,
  onLogout: () => { console.error("logout function not defined");}
};

export default Header;
