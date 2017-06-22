import React from 'react';
import { Drama } from 'components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class DramaList extends React.Component {
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
    return (
      <div>
        <ReactCSSTransitionGroup transitionName="memo"
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={1000}>
          {mapToComponents(this.props.data)}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

DramaList.propTypes = {
  data: React.PropTypes.array,
  currentUser: React.PropTypes.string,
  onRemove: React.PropTypes.func
}

DramaList.defaultProps = {
  data: [],
  currentUser: '',
  onRemove: (id, index) => {
    console.log('remove function not defined');
  }
};

export default DramaList;
