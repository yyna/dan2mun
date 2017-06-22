import React from 'react';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };
  }

  handleChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  handleKeyPress(e) {
    // IF PRESSED ENTER, TRIGGER TO NAVIGATE TO THE FIRST USER SHOWN
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
