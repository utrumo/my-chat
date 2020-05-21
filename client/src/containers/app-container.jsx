import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root.js';
import AppContainer from '@/components/app/app.jsx';
import { DataSelector, DataOperation } from '@/redux/redux.js';

const mapStateToProps = (state) => ({
  messages: DataSelector.getMessages(state),
});
const mapDispatchToProps = {
  initConnection: DataOperation.doConnectRequest,
};

export default hot(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
