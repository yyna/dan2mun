import React from 'react';
import {browserHistory} from "react-router";

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  handleKeyDown(e) {
    // IF PRESSED ENTER,
    if(e.keyCode === 13) {
      browserHistory.push('/result/' + this.state.keyword);
    }
  }

  render() {
    $(document).ready(function() {
      $('select').material_select();
    });
    return (
      <nav>
        <div className="nav-wrapper">
          <form className="nav-wrapper">
            <div className="input-field">
              <input
                id="search"
                type="search"
                value={this.state.keyword}
                onChange={this.handleChange}
                placeholder="시대를 입력해주세요."
                onKeyDown={this.handleKeyDown}
                required/>
              <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
              <i className="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>
    );
  }
}

export default Search;
