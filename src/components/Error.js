import React from 'react';

class Error extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {data} = this.props;

    const dropDownMenu = (
      <div className="option-button">
        <a className='dropdown-button'
          id={`dropdown-button-${data._id}`}
          data-activates={`dropdown-${data._id}`}>
          <i className="material-icons icon-button">more_vert</i>
        </a>
        <ul id={`dropdown-${data._id}`} className='dropdown-content'>
          <li><a>Remove</a></li>
        </ul>
      </div>
    );

    const errorView = (
      <div className="card">
        <div className="info">
          <div className="username">{data.username}</div>
          { dropDownMenu }
        </div>
        <div className="card-content">
          <div>{data.contents}</div>
        </div>
      </div>
    );

    return (
      <div className="container memo">
        {errorView}
      </div>
    );
  }
}

export default Error;
