// src/containers/Home.js
import React from 'react';
import { DramaList } from 'components';
import { connect } from 'react-redux';
import { dramaListRequest } from 'actions/drama';

class Home extends React.Component {

  componentDidMount() {
    this.props.dramaListRequest(true).then(
      () => {
        console.log(this.props);
      }
    )
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
    dramaData: state.drama.list.data
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
