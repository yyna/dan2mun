import React from 'react';
import { Drama } from 'components';

class DramaList extends React.Component {
  render() {
    const mapToComponents = data => {
      return data.map((drama, i) => {
        return (<Drama
          data={drama}
          key={drama._id}
          />);
      })
    }
    return (
      <div>
        {mapToComponents(this.props.data)}
      </div>
    );
  }
}

DramaList.propTypes = {
  data: React.PropTypes.array,
  currentUser: React.PropTypes.string
}

DramaList.defaultProps = {
  data: [],
  currentUser: ''
};

export default DramaList;
