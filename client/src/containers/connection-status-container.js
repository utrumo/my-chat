import { connect } from 'react-redux';
import ConnectionStatus from '@/components/connection-status/connection-status.jsx';
import { DataSelector, DataOperation } from '@/redux/redux.js';

const mapStateToProps = (state) => ({
  connection: DataSelector.getConnectionState(state),
  isAuthorizationRequired: DataSelector.getAuthorizationStatus(state),
  userName: DataSelector.getUserName(state),
});

const mapDispatchToProps = {
  logoutUser: DataOperation.logoutFromServer,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionStatus);
