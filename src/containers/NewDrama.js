import React from 'react';
import { connect } from 'react-redux';
import { dramaAddRequest } from 'actions/drama';

class NewDrama extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      director: "",
      actors: "",
      genre: "",
      era: "",
      king: "",
      events: "",
      image: ""
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
    return this.props.dramaAddRequest(this.state.title, this.state.director, this.state.actors, this.state.genre, this.state.era, this.state.king, this.state.events, this.state.image).then(
      () => {
        if (this.props.addStatus === "SUCCESS") {
          // TRIGGER LOAD NEW DRAMA
          // TO BE IMPLEMENTED
          $('input[type=text]').val('');
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
            case 3:
              $toastContent = $('<span style="color: #FFB4BA">Plase login as Admin</span>');
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
              <input type="text" placeholder="배우1, 배우2" name="actors" onChange={this.handleChange}/>
              <input type="text" placeholder="장르" name="genre" onChange={this.handleChange}/>
              <input type="text" placeholder="시대" name="era" onChange={this.handleChange}/>
              <input type="text" placeholder="통치자" name="king" onChange={this.handleChange}/>
              <input type="text" placeholder="관련사건" name="events" onChange={this.handleChange}/>
              <input type="text" placeholder="이미지" name="image" onChange={this.handleChange}/>
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

// NewDrama.propTypes = {
//   title: React.PropTypes.string,
//   director: React.PropTypes.string,
//   onAdd: React.PropTypes.func
// }
//
// NewDrama.defaultProps = {
//   title: '',
//   director: '',
//   onAdd: (title, director) => { console.error("add drama function not defined"); }
// }

const mapStateToProps = (state) => {
  return {
    addStatus: state.drama.add.status
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dramaAddRequest: (title, director, actors, genre, era, king, events, image) => {
      return dispatch(dramaAddRequest(title, director, actors, genre, era, king, events, image));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDrama);
