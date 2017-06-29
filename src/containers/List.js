// src/containers/List.js
import React from 'react';
import { DramaList, Search } from 'components';
import { connect } from 'react-redux';
import { dramaListRequest, dramaRemoveRequest } from 'actions/drama';

class List extends React.Component {

  constructor(props) {
    super(props);
    this.loadNewDrama = this.loadNewDrama.bind(this);
    this.loadOldDrama = this.loadOldDrama.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.state = {
      loadingState: false,
      initiallyLoaded: false,
      intervalId: 0
    };
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
    // DO THE INITIAL LOADING
    this.props.dramaListRequest(true, undefined, undefined, this.props.era).then(
      () => {
        // LOAD DRAMA UNTIL SCROLLABLE
        // setTimeout(loadUntilScrollable, 1000);
        // BEGIN NEW DRAMA LOADING loadDramaLoop
        loadDramaLoop();
        this.setState({
          initiallyLoaded: true
        })
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

    this.setState({
      initiallyLoaded: false
    })
  }

  loadNewDrama() {
    // CANCEL IF THERE IS A PENDING REQUEST
    if(this.props.listStatus === 'WAITING')
      return new Promise((resolve, reject)=> {
        resolve();
      });

    // IF PAGE IS EMPTY, DO THE INITIAL LOADING
    if(this.props.dramaData.length === 0 )
      return this.props.dramaListRequest(true, undefined, undefined, this.props.era);

    return this.props.dramaListRequest(false, 'new', this.props.dramaData[0].when, this.props.era);
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
    let lastId = this.props.dramaData[this.props.dramaData.length - 1].when;

    // START REQUEST
    return this.props.dramaListRequest(false, 'old', lastId, this.props.era).then(() => {
      // IF IT IS LAST PAGE, NOTIFY
      if(this.props.isLast) {
        Materialize.toast('You are reading the last page', 2000);
      }
    });
  }

  handleRemove(id, index) {
    this.props.dramaRemoveRequest(id, index).then(() => {
      if(this.props.removeStatus.status === 'SUCCESS') {
        // LOAD MORE DRAMA IF THERE IS NO SCROLLBAR
        // 1 SECOND LATER. (ANIMATION TAKES 1SEC)
        setTimeout(() => {
          if($("body").height() < $(window).height()) {
            this.loadOldMemo();
          }
        }, 1000);
      } else {
        // ERROR
        /*
          DELETE DRAMA: DELETE /api/drama/:id
          ERROR CODES
            1: INVALID ID
            2: NOT ADMIN
            3: NO RESOURCE
            4: PERMISSION FAILURE
        */
        let errorMessage = [
          'Something broke',
          'Please login as Admin',
          'That drama does not exist',
          'You do not have permission'
        ];

        // NOTIFY ERROR
        let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.removeStatus.error - 1] + '</span>');

        // IF NOT LOGGED IN, REFRESH THE PAGE
        if(this.props.removeStatus.error === 2) {
          setTimeout(() => {location.reload(false)}, 2000);
        }
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.era !== prevProps.era) {
      this.componentWillUnmount();
      this.componentDidMount();
    }
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - 50);
  }

  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), 16.66);
    this.setState({ intervalId: intervalId });
  }

  render() {

    const emptyView = (
      <div className="container">
        <div className="empty-page">
          <b>{this.props.era}</b>를 배경으로 한 영화나 드라마는 없습니다.<br/>
        </div>
      </div>
    );

    const wallHeader = (
      <div>
        <div className="container wall-info">
          <div className="card wall-info blue lighten-2 white-text">
            <div className="card-content grey darken-3">
              {this.props.era}
            </div>
          </div>
        </div>
        { this.props.dramaData.length === 0 && this.state.initiallyLoaded ? emptyView : undefined }
      </div>
    );

    return (
      <div>
        <Search/>
        <div className="wrapper">
          { typeof this.props.era !== "undefined" ? wallHeader : undefined }
          <DramaList data={this.props.dramaData} currentUser={this.props.currentUser} onRemove={this.handleRemove}/>
        </div>
        <div className="fixed-action-btn">
          <a className="btn-floating btn-large grey darken-3 scroll" onClick={ () => { this.scrollToTop(); }}>
            <i className="large material-icons">navigation</i>
          </a>
        </div>
      </div>
    );
  }
}

List.PropTypes = {
  era: React.PropTypes.string
};

List.defaultProps = {
  era: undefined
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authentication.status.isLoggedIn,
    addStatus: state.drama.add,
    currentUser: state.authentication.status.currentUser,
    dramaData: state.drama.list.data,
    listStatus: state.drama.list.status,
    isLast: state.drama.list.isLast,
    removeStatus: state.drama.remove
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dramaListRequest: (isInitial, listType, id, title) => {
      return dispatch(dramaListRequest(isInitial, listType, id, title));
    },
    dramaRemoveRequest: (id, index) => {
      return dispatch(dramaRemoveRequest(id, index));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
