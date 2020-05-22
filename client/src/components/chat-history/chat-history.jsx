import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { getTime } from '@/components/common/utils.js';
import styles from './chat-history-styles.js';

const useStyles = createUseStyles(styles);

const ChatHistory = ({ messages }) => {
  const classes = useStyles();
  return (
    <section className={classes.chatHistory}>
      <h2 className={classes.visuallyHidden}>Messages history</h2>
      <ul className={classes.messagesList}>
        {messages.map(({ timestamp, message }) => (
          <li key={timestamp} className={classes.message}>{`${getTime(timestamp)} ${message}`}</li>
        ))}
      </ul>
    </section>
  );
};

ChatHistory.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.exact({
      timestamp: PropTypes.number,
      message: PropTypes.string,
    }),
  ).isRequired,
};

export default ChatHistory;
