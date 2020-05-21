import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import styles from './chat-history-styles.js';

const useStyles = createUseStyles(styles);

const ChatHistory = ({ messages }) => {
  const classes = useStyles();
  return (
    <section className={classes.chatHistory}>
      <h2 className={classes.visuallyHidden}>Messages history</h2>
      <ul className={classes.messagesList}>
        {messages.map(({ id, message }) => (
          <li key={id} className={classes.message}>{message}</li>
        ))}
      </ul>
    </section>
  );
};

ChatHistory.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      message: PropTypes.string,
    }),
  ).isRequired,
};

export default ChatHistory;
