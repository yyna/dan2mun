import React from 'react';
import { connect } from 'react-redux';
import { dramaAddRequest } from 'actions/drama';
import ReactDOM from 'react-dom';
import {browserHistory} from "react-router";
const FileUpload = require('react-fileupload');

class NewDrama extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      director: "",
      actors: "",
      genre: "",
      era: "단군조선",
      king: "",
      events: "",
      image: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleSelectChange(event) {
    event.preventDefault();
    this.setState({era: event.target.value});
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
              1: NOT LOGGED IN
              2: EMPTY CONTENTS
              3: NOT ADMIN
              4: DRAMA EXISTS
          */
          let $toastContent;
          switch(this.props.errorCode) {
            case 1:
              // IF NOT ADMIN
              $toastContent = $('<span style="color: #FFB4BA">You are not logged</span>');
              Materialize.toast($toastContent, 2000);
              browserHistory.push('/login');
              break;
            case 2:
              $toastContent = $('<span style="color: #FFB4BA">Please write something</span>');
              Materialize.toast($toastContent, 2000);
              break;
            case 3:
              $toastContent = $('<span style="color: #FFB4BA">Plase login as Admin</span>');
              Materialize.toast($toastContent, 2000);
              browserHistory.push('/login');
              break;
            case 4:
              $toastContent = $('<span style="color: #FFB4BA">Drama/Movie already exists</span>');
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

  componentDidMount() {
    // Use Materialize custom select input
    $(document).ready(function() {
      $('select').material_select();
    });
    $(ReactDOM.findDOMNode(this.refs.testSelect)).on('change',this.handleSelectChange.bind(this));
  }

  render() {
    $(document).ready(function() {
      $('#select').material_select();
    });

    const options={
      baseUrl:'http://127.0.0.1',
      param:{
        fid:0
      }
    }

    return (
      <div>
        <div className="container write">
          <div className="card">
            <div className="card-content">
              <input type="text" placeholder="제목" name="title" onChange={this.handleChange}/>
              <input type="text" placeholder="감독" name="director" onChange={this.handleChange}/>
              <input type="text" placeholder="배우1, 배우2" name="actors" onChange={this.handleChange}/>
              <input type="text" placeholder="장르" name="genre" onChange={this.handleChange}/>
              <div className="input-field col s12">
                <select name="era" onChange={this.handleSelectChange} ref="testSelect">
                  <optgroup label="고조선 시대">
                    <option value="단군조선">단군조선</option>
                    <option value="위만조선">위만조선</option>
                  </optgroup>
                  <optgroup label="원삼국 시대">
                    <option value="부여">부여</option>
                    <option value="옥저.동예">옥저.동예</option>
                    <option value="삼한">삼한(마한,진한,변한)</option>
                  </optgroup>
                  <optgroup label="삼국 시대">
                    <option value="고구려">고구려</option>
                    <option value="백제">백제</option>
                    <option value="신라">신라</option>
                    <option value="가야">가야</option>
                  </optgroup>
                  <optgroup label="남북국 시대">
                    <option value="통일신라">통일신라</option>
                    <option value="발해">발해</option>
                  </optgroup>
                  <optgroup label="후삼국 시대">
                    <option value="신라">신라</option>
                    <option value="후백제">후백제</option>
                    <option value="태봉">태봉(후고구려)</option>
                  </optgroup>
                  <optgroup label="통일 왕조 시대">
                    <option value="고려">고려</option>
                    <option value="조선">조선</option>
                    <option value="대한제국">대한제국</option>
                  </optgroup>
                  <optgroup label="식민지 시대">
                    <option value="일제강점기">일제강점기</option>
                    <option value="대한민국 임시정부">대한민국 임시정부</option>
                  </optgroup>
                  <optgroup label="현대">
                    <option value="군정기">군정기</option>
                    <option value="대한민국">대한민국</option>
                  </optgroup>
                </select>
              </div>
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
    addStatus: state.drama.add.status,
    errorCode: state.drama.add.error
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
