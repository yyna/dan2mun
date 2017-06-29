import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l4 offset-l2 s12 center">
              <h6 className="white-text">Links</h6>
              <a className="grey-text text-lighten-3" href="https://github.com/yyna/dan2mun" target="_blank">
                <img src="img/github.png" className="logo"/>
              </a>
              <a className="grey-text text-lighten-3" href="https://www.linkedin.com/in/jungin/" target="_blank">
                <img src="img/linkedin.png" className="logo"/>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
          © 2017 Copyright Jungin Kwon
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
