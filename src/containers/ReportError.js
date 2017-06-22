import React from 'react';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from 'actions/authentication';

class ReportError extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getStatusRequest().then(
      () => {
        // console.log(this.props.status);
        // if not logged in
        if(!this.props.status.isLoggedIn) {
          // and notify
          let $toastContent = $('<span style="color: #FFB4BA">로그인 후 사용해주세요.</span>');
          Materialize.toast($toastContent, 4000);
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
            <textarea id="error"></textarea>
          </div>
          <a className="waves-effect waves-light btn grey darken-3 myButton">보내기</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
    logoutRequest: () => {
      return dispatch(logoutRequest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportError);
