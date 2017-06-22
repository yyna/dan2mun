import React from 'react';
import { Drama } from 'components';

class DramaList extends React.Component {
  render() {
    const mapToComponents = data => {
      return data.map((drama, i) => {
        return (<Drama
          data={drama}
          key={drama._id}
          onRemove={this.props.onRemove}
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
  currentUser: React.PropTypes.string,
  onRemove: React.PropTypes.func
}

DramaList.defaultProps = {
  data: [],
  currentUser: '',
  onRemove: (id, index) => {
    console.log('remove function nont defined');
  }
};

export default DramaList;
