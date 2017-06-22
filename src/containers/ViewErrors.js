import React from 'react';
import { ErrorList } from 'components';
import { connect } from 'react-redux';
import { errorListRequest } from 'actions/error';

class ViewErrors extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.errorListRequest().then(
      () => {
        //console.log(this.props.errorData);
      }
    )
  }

  render() {
    return (
      <div>
        <ErrorList data={this.props.errorData}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorData: state.error.list.data
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    errorListRequest: () => {
      return dispatch(errorListRequest());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewErrors);
