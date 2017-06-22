import React from 'react';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from 'actions/authentication';

class Drama extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false
    };
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidUpdate() {
    // WHEN COMPONENT UPDATES, INITIALIZE DROPDOWN
    // (TRIGGERED WHEN LOGGED IN)
    $('#dropdown-button-'+this.props.data._id).dropdown({
        belowOrigin: true // Displays dropdown below the button
    });
  }

  componentDidMount() {
    // WHEN COMPONENT MOUNTS, INITIALIZE DROPDOWN
    // (TRIGGERED WHEN REFRESHED)
    $('#dropdown-button-'+this.props.data._id).dropdown({
      belowOrigin: true // Displays dropdown below the button
    });

    this.props.getStatusRequest().then(
      () => {
        this.setState({
          isAdmin: this.props.status.isAdmin
        });
      }
    )
  }

  handleRemove() {
    let id = this.props.data._id;
    let index = this.props.index;
    this.props.onRemove(id, index);
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
          <li><a onClick={this.handleRemove}>삭제</a></li>
        </ul>
      </div>
    );

    const dramaView = (
      <div className="card">
        <div className="info">
          <a className="username">{data.title}</a>
          { this.state.isAdmin ? dropDownMenu : undefined }
        </div>
        <div className="card-content">
          <table className="drama-table">
            <tbody>
              <tr><td rowSpan="6" className="image-cell"><img src={data.image} className="poster"/></td><td className="table-label">감독</td><td><a>{data.director}</a></td></tr>
              <tr><td className="table-label">출연진</td><td id={data._id}>{data.actors.join(", ")}</td></tr>
              <tr><td className="table-label">장르</td><td><a>{data.genre}</a></td></tr>
              <tr><td className="table-label">시대</td><td><a>{data.era}</a></td></tr>
              <tr><td className="table-label">통치자</td><td><a>{data.king}</a></td></tr>
              <tr><td className="table-label">관련 사건</td><td><a>{data.events}</a></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );

    const actors = (actor, id) => {
      console.log(actor);
      for (var i=0; i<actor.length; i++) {
        var obj = actor[i];
        $("#"+id).append("<a>"+obj['이름']+"</a>, ");
      }
    }

    return(
      <div className="container memo">
        { dramaView }
      </div>
    );
  }
}

Drama.propTypes = {
  data: React.PropTypes.object,
  isAdmin: React.PropTypes.bool,
  onRemove: React.PropTypes.func
};

Drama.defaultProps = {
  data: {
    _id: 'id1234567890',
    title: '제목',
    director: '감독',
    actors: [{'이름':'배우'}],
    genre: '장르',
    era: '시대',
    king: '통치자',
    events: '관련 사건',
    image: 'https://image-proxy.namuwikiusercontent.com/r/http%3A%2F%2Fimgmovie.naver.com%2Fmdi%2Fmi%2F0398%2F39894_P01_125635.jpg'
  },
  onRemove: (id, index) => {
    console.error('remove function not defined');
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

export default connect(mapStateToProps, mapDispatchToProps)(Drama);
