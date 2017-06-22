// src/containers/Home.js
import React from 'react';
import { DramaList } from 'components';
import { connect } from 'react-redux';
import { dramaListRequest } from 'actions/drama';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.loadNewDrama = this.loadNewDrama.bind(this);
    this.loadOldDrama = this.loadOldDrama.bind(this);
    this.state = {
      loadingState: false
    }
  }

  componentDidMount() {
    // LOAD NEW DRAMA EVERY 5 SECONDS
    const loadDramaLoop = () => {
      this.loadNewDrama().then(
        () => {
          this.dramaLoaderTimeoutId = setTimeout(loadDramaLoop, 5000);
        }
      );
    };
    this.props.dramaListRequest(true).then(
      () => {
        // BEGIN NEW DRAMA LOADING loadDramaLoop
        loadDramaLoop();
      }
    );
    $(window).scroll(() => {
      // WHEN HEIGHT UNDER SCROLLBOTTOM IS LESS THEN 250
      if ($(document).height() - $(window).height() - $(window).scrollTop() < 250) {
        if(!this.state.loadingState){
          this.loadOldDrama();
          this.setState({
            loadingState: true
          });
        }
      } else {
        if(this.state.loadingState){
          this.setState({
            loadingState: false
          });
        }
      }
    });
  }

  componentWillUnmount() {
    // STOP THE loadDramaLoop
    clearTimeout(this.dramaLoaderTimeoutId);

    // REMOVE WINDOWS SCROLL LISTENER
    $(window).unbind();
  }

  loadNewDrama() {
    // CANCEL IF THERE IS A PENDING REQUEST
    if(this.props.listStatus === 'WAITING')
      return new Promise((resolve, reject)=> {
        resolve();
      });

    // IF PAGE IS EMPTY, DO THE INITIAL LOADING
    if(this.props.dramaData.length === 0 )
      return this.props.dramaListRequest(true);

    return this.props.dramaListRequest(false, 'new', this.props.dramaData[0]._id);
  }

  loadOldDrama() {
    // CANCEL IF USER IS READING THE LAST PAGE
    if(this.props.isLast) {
      return new Promise(
        (resolve, reject)=> {
          resolve();
        }
      );
    }

    // GET ID OF THE DRAMA AT THE BOTTOM
    let lastId = this.props.dramaData[this.props.dramaData.length - 1]._id;

    // START REQUEST
    return this.props.dramaListRequest(false, 'old', lastId).then(() => {
      // IF IT IS LAST PAGE, NOTIFY
      if(this.props.isLast) {
        Materialize.toast('You are reading the last page', 2000);
      }
    });
  }

  render() {
    return (
      <div className="wrapper">
        <DramaList data={this.props.dramaData} currentUser={this.props.currentUser}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authentication.status.isLoggedIn,
    addStatus: state.drama.add,
    currentUser: state.authentication.status.currentUser,
    dramaData: state.drama.list.data,
    listStatus: state.drama.list.status,
    isLast: state.drama.list.isLast
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dramaListRequest: (isInitial, listType, id, title) => {
      return dispatch(dramaListRequest(isInitial, listType, id, title));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
