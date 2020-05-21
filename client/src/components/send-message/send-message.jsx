import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './send-message.styles.js';

const useStyles = createUseStyles(styles);

const SendMessage = () => {
  const classes = useStyles();
  return (
    <section>
      <h2 className={classes.visuallyHidden}>Send your message</h2>
      <form className={classes.sendMessageForm}>
        <label className={classes.sendMessageFieldLabel}>
          <span className={classes.visuallyHidden}>Your message</span>
          <textarea
            className={classes.sendMessageField}
            placeholder="Your message"
            autoComplete="off"
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </section>
  );
};

export default SendMessage;
