import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import ChatHistoryContainer from '@/containers/chat-history-container.js';
import ConnectionStatus from '@/containers/connection-status-container.js';
import SendMessage from '@/containers/send-message-container.js';
import UsersContainer from '@/containers/users-container.js';
import LoginModalContainer from '@/containers/login-modal-container.js';
import styles from './main-page-styles.js';

const useStyles = createUseStyles(styles);

const MainPage = ({ isAuthorizationRequired }) => {
  const classes = useStyles();
  return (
    <main className={classes.pageMain}>
      <h1 className={classes.visuallyHidden}>My chat</h1>
      <ConnectionStatus />
      <div className={classes.chatColumns}>
        <div className={classes.messagesColumn}>
          <ChatHistoryContainer />
          <SendMessage />
        </div>
        <UsersContainer />
      </div>
      { isAuthorizationRequired && <LoginModalContainer />}
    </main>
  );
};

MainPage.propTypes = {
  isAuthorizationRequired: PropTypes.bool.isRequired,
};

export default MainPage;
