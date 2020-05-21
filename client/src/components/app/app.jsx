import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import styles from './styles.js';

const useStyles = createUseStyles(styles);

const App = ({ messages, initConnection }) => {
  useEffect(() => { initConnection(); }, []);
  const classes = useStyles();
  return (
    <main className={classes.pageMain}>
      <h1 className={classes.visuallyHidden}>My chat</h1>
      <section>
        <h2 className={classes.connectionStatus}>Connection status: idle</h2>
      </section>
      <div className={classes.chatColumns}>
        <div className={classes.messagesColumn}>
          <section className={classes.messagesHistory}>
            <h2 className={classes.visuallyHidden}>Messages history</h2>
            <ul className={classes.messagesList}>
              {messages.map(({ id, message }) => (
                <li key={id} className={classes.li}>{message}</li>
              ))}
            </ul>
          </section>
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
              <button type="submit">Submit</button>
            </form>
          </section>
        </div>
        <section className={classes.usersListColumn}>
          <h2 className={classes.usersListTitle}>Users list</h2>
          <ul className={classes.usersList}>
            <li>first user</li>
            <li>second user</li>
          </ul>
        </section>
      </div>
    </main>
  );
};

App.propTypes = {
  initConnection: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      message: PropTypes.string,
    }),
  ).isRequired,
};

export default App;
