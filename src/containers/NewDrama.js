import React from 'react';
import { connect } from 'react-redux';
import { dramaAddRequest } from 'actions/drama';

class NewDrama extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      director: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  /* ADD DRAMA */
  handleAdd() {
    return this.props.dramaAddRequest(this.state.title, this.state.director).then(
      () => {
        console.log(this.props);
        if (this.props.status === "SUCCESS") {
          // TRIGGER LOAD NEW DRAMA
          // TO BE IMPLEMENTED
          Materialize.toast('Success!', 2000);
        } else {
          /*
            ERROR CODES
              1: NOT ADMIN
              2: EMPTY CONTENTS
          */
          let $toastContent;
          switch(this.props.error) {
            case 1:
              // IF NOT ADMIN
              $toastContent = $('<span style="color: #FFB4BA">You are not logged in as Admin</span>');
              Materialize.toast($toastContent, 2000);
              setTimeout(() => {location.reload(false);}, 2000);
              break;
            case 2:
              $toastContent = $('<span style="color: #FFB4BA">Please write something</span>');
              Materialize.toast($toastContent, 2000);
              break;
            default:
              $toastContent = $('<span style="color: #FFB4BA">Something Broke</span>');
              Materialize.toast($toastContent, 2000);
              break;
          }
        }
      }
    );
  }

  render() {
    return (
      <div>
        <div className="container write">
          <div className="card">
            <div className="card-content">
              <input type="text" placeholder="제목" name="title" onChange={this.handleChange}/>
              <input type="text" placeholder="감독" name="director" onChange={this.handleChange}/>
            </div>
            <div className="card-action">
              <a className="waves-effect waves-light btn" onClick={this.handleAdd}>추가하기</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewDrama.propTypes = {
  title: React.PropTypes.string,
  director: React.PropTypes.string,
  onAdd: React.PropTypes.func
}

NewDrama.defaultProps = {
  title: '',
  director: '',
  onAdd: (title, director) => { console.error("add drama function not defined"); }
}

const mapStateToProps = (state) => {
  return {
    addStatus: state.drama.add
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dramaAddRequest: (title, director) => {
      return dispatch(dramaAddRequest(title, director));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDrama);
