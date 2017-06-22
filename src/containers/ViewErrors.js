import React from 'react';
import { ErrorList } from 'components';
import { connect } from 'react-redux';
import { errorListRequest, errorRemoveRequest } from 'actions/error';

class ViewErrors extends React.Component {

  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    this.props.errorListRequest().then(
      () => {
        //console.log(this.props.errorData);
      }
    )
  }

  handleRemove(id, index) {
    this.props.errorRemoveRequest(id, index).then(() => {
      if(this.props.removeStatus.status === 'SUCCESS') {

      } else {
        // ERROR
        /*
          DELETE ERROR: DELETE /api/error/:id
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
        Materialize.toast($toastContent, 2000);


        // IF NOT LOGGED IN, REFRESH THE PAGE
        if(this.props.removeStatus.error === 2) {
          setTimeout(()=> {location.reload(false)}, 2000);
        }
      }
    })
  }

  render() {
    return (
      <div>
        <ErrorList data={this.props.errorData} onRemove={this.handleRemove}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorData: state.error.list.data,
    removeStatus: state.error.remove
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    errorListRequest: () => {
      return dispatch(errorListRequest());
    },
    errorRemoveRequest: (id, index) => {
      return dispatch(errorRemoveRequest(id, index));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewErrors);
