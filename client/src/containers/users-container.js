import { connect } from 'react-redux';
import { DataSelector } from '@/redux/redux.js';
import Users from '@/components/users/users.jsx';

const mapStateToProps = (state) => ({
  users: DataSelector.getUsers(state),
});

export default connect(mapStateToProps)(Users);
