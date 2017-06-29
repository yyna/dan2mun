import React from 'react';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from 'actions/authentication';
import { errorAddRequest } from 'actions/error';
import { browserHistory } from "react-router";

class ReportError extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(e) {
    this.setState({
      contents: e.target.value
    });
  }

  handleAdd() {
    return this.props.errorAddRequest(this.state.contents).then(
      () => {
        if(this.props.addStatus.status === 'SUCCESS') {
          // trigger load new error
          Materialize.toast("오류가 신고되었습니다.", 2000);
          this.setState({
              contents: ""
          });
        } else {
          let $toastContent;
          switch(this.props.addStatus.error) {
            case 1:
              // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
              $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
              Materialize.toast($toastContent, 2000);
              setTimeout(()=> {location.reload(false);}, 2000);
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
    )
  }

  componentDidMount() {
    this.props.getStatusRequest().then(
      () => {
        // if not logged in
        if(!this.props.status.isLoggedIn) {
          // and notify
          let $toastContent = $('<span style="color: #FFB4BA">로그인 후 사용해주세요.</span>');
          Materialize.toast($toastContent, 4000);
          browserHistory.push('/login');
        }
      }
    )
  }

  render() {
    return (
      <div className="container">
        <div className="center">
          <br/><br/><div><h5>오류가 있어요 :-(</h5></div>
        </div>
        <div className="center">
          <div className="center">
            <textarea id="error"
            value={this.state.contents}
            onChange={this.handleChange}></textarea>
          </div>
          <a className="waves-effect waves-light btn grey darken-3 myButton" onClick={this.handleAdd}>보내기</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.status,
    addStatus: state.error.add
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
    errorAddRequest: (contents) => {
      return dispatch(errorAddRequest(contents));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportError);
