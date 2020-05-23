import { connect } from 'react-redux';
import ConnectionStatus from '@/components/connection-status/connection-status.jsx';
import { DataSelector } from '@/redux/redux.js';

const mapStateToProps = (state) => ({
  connection: DataSelector.getConnectionState(state),
});

export default connect(mapStateToProps)(ConnectionStatus);
