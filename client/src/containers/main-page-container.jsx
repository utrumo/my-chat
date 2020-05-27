import { connect } from 'react-redux';
import { DataSelector } from '@/redux/redux.js';
import MainPage from '@/components/main-page/main-page.jsx';

const mapStateToProps = (state) => ({
  isAuthorizationRequired: DataSelector.getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(MainPage);
