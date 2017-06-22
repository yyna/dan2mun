import React from 'react';
import { Error } from 'components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ErrorList extends React.Component {
  render() {
    const mapToComponents = data => {
      return data.map((error, i) => {
        return (
          <Error
            data={error}
            key={error._id}
            index={i}
            onRemove={this.props.onRemove}
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

ErrorList.propTypes = {
  data: React.PropTypes.array,
  currentUser: React.PropTypes.string,
  onRemove: React.PropTypes.func,
}

ErrorList.defaultProps = {
  data: [],
  currentUser: '',
  onRemove: (id, index) => {
    console.error('remove function not defined');
  }
};

export default ErrorList;
