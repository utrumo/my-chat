import { connect } from 'react-redux';
import { DataOperation } from '@/redux/redux.js';
import SendMessage from '@/components/send-message/send-message.jsx';

const mapDispatchToProps = {
  sendMessage: DataOperation.sendMessage,
};

export default connect(null, mapDispatchToProps)(SendMessage);
