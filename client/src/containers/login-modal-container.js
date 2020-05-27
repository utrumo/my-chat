import { connect } from 'react-redux';
import { DataOperation } from '@/redux/redux.js';
import LoginModal from '@/components/login-modal/login-modal.jsx';

const mapDispatchToProps = {
  authorize: DataOperation.authorizeOnServer,
};

export default connect(null, mapDispatchToProps)(LoginModal);
