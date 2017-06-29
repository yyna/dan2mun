import React, { Component, PropTypes } from 'react';
import { Introduction, Statistics, NewlyAddedDramaList } from 'components';
import { connect } from 'react-redux';
import { newlyAddedDramaListRequest, dramaCountRequest } from 'actions/drama';

class Home extends Component {
  constructor(props) {
    super(props);
    this.loadNewlyAddedDrama = this.loadNewlyAddedDrama.bind(this);
    this.loadDramaCount = this.loadDramaCount.bind(this);
    this.state = {
      loadingState: false
    };
  }

  loadNewlyAddedDrama() {
    return this.props.newlyAddedDramaListRequest();
  }

  loadDramaCount() {
    return this.props.dramaCountRequest();
  }

  componentDidMount() {
    this.props.newlyAddedDramaListRequest().then(
      () => {
        this.setState({
          loadingState: true
        });
      }
    );
    this.props.dramaCountRequest().then(
      () => {
        console.log(this.props.dramaCount);
      }
    )
  }

  render() {
    var demo = {
      "조선": 100,
      "대한민국": 50,
      "고구려": 15,
      "고조선": 5
    };

    return(
      <div className="center">
        <Introduction/>
        <br/>
        <Statistics data={this.props.dramaCount}/>
        <br/>
        <NewlyAddedDramaList data={this.props.newDramaData}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newDramaData: state.drama.new.data,
    dramaCount: state.drama.count.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newlyAddedDramaListRequest: () => {
      return dispatch(newlyAddedDramaListRequest());
    },
    dramaCountRequest: () => {
      return dispatch(dramaCountRequest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
