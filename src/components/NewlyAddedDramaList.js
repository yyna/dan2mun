import React, { Component, PropTypes } from 'react';
import { Drama } from 'components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class NewlyAddedDramaList extends Component {
  render() {
    const mapToComponents = data => {
      return data.map((drama, i) => {
        return (
          <Drama
            data={drama}
            key={drama._id}
            onRemove={this.props.onRemove}
            index={i}
          />
      );
      })
    }
    return(
      <div>
        새롭게 추가된 영화/드라마들
        <ReactCSSTransitionGroup transitionName="memo"
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={1000}>
          {mapToComponents(this.props.data)}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

NewlyAddedDramaList.defaultProps = {
  data: [],
  currentUser: '',
  onRemove: (id, index) => {
    console.log('remove function not defined');
  }
};

export default NewlyAddedDramaList;
