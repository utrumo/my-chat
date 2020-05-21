import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root.js';
import { DataOperation } from '@/redux/redux.js';
import AppContainer from '@/components/app/app.jsx';

const mapDispatchToProps = {
  initConnection: DataOperation.doConnectRequest,
};

export default hot(connect(null, mapDispatchToProps)(AppContainer));
