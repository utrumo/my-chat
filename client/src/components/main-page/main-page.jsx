import React from 'react';
import { createUseStyles } from 'react-jss';
import ChatHistoryContainer from '@/containers/chat-history-container.js';
import ConnectionStatus from '@/components/connection-status/connection-status.jsx';
import SendMessage from '@/components/send-message/send-message.jsx';
import Users from '@/components/users/users.jsx';
import styles from './main-page-styles.js';

const useStyles = createUseStyles(styles);

const MainPage = () => {
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
        <Users />
      </div>
    </main>
  );
};

export default MainPage;
