import { hot } from 'react-hot-loader/root.js';
import { connect } from 'react-redux';
import { DataOperation } from '@/redux/redux.js';
import App from '@/components/app/app.jsx';

const mapDispatchToProps = {
  sendConnectionRequest: DataOperation.connectToServer,
};

export default hot(connect(null, mapDispatchToProps)(App));
