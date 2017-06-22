import React from 'react';
import { Error } from 'components';

class ErrorList extends React.Component {
  render() {
    const mapToComponents = data => {
      return data.map((error, i) => {
        return (
          <Error data={error} key={error._id}/>
        );
      })
    }

    return (
      <div>
        {mapToComponents(this.props.data)}
      </div>
    );
  }
}

ErrorList.propTypes = {
  data: React.PropTypes.array,
  currentUser: React.PropTypes.string
}

ErrorList.defaultProps = {
  data: [],
  currentUser: ''
};

export default ErrorList;
