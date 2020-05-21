import { connect } from 'react-redux';
import { DataSelector } from '@/redux/redux.js';
import ChatHistory from '@/components/chat-history/chat-history.jsx';

const mapStateToProps = (state) => ({
  messages: DataSelector.getMessages(state),
});

export default connect(mapStateToProps)(ChatHistory);
