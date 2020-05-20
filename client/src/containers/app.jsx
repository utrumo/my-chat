import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { DataSelector, DataOperation } from '../redux';

const visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  border: 0,
  padding: 0,
  whiteSpace: 'nowrap',
  clipPath: 'inset(100%)',
  clip: 'rect(0 0 0 0)',
  overflow: 'hidden',
};

const useStyles = createUseStyles({
  visuallyHidden,
  '@global': {
    body: {
      margin: 0,
      boxSizing: 'border-box',
    },
    '*, ::after, ::before': {
      boxSizing: 'inherit',
    },
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    height: '100vh',
  },
  wrapper: {
    display: 'flex',
    flexGrow: 1,
    overflowY: 'hidden',
    border: '3px solid blue',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  chatHistory: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflowY: 'hidden',
    border: '1px solid red',
  },
  messageList: {
    flexGrow: 1,
    overflowY: 'auto',
    listStyle: 'none',
  },
  li: {
    color: 'green',
  },
});

// eslint-disable jsx-a11y-no-autofocus
const App = ({ messages, initConnection }) => {
  useEffect(() => { initConnection(); }, []);
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <h1>My chat</h1>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <section className={classes.chatHistory}>
            <h2 className={classes.visuallyHidden}>Chat history</h2>
            <ul className={classes.messageList}>
              {messages.map(({ id, message }) => (
                <li key={id} className={classes.li}>{message}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className={classes.visuallyHidden}>Send message form</h3>
            <form>
              <label>
                <span className={classes.visuallyHidden}>Your message</span>
                <textarea placeholder="Type a message" autoComplete="off" />
              </label>
              <button type="submit">Submit</button>
            </form>
          </section>
        </div>
        <section>
          <h4>User list</h4>
          <ul>
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

const mapStateToProps = (state) => ({
  messages: DataSelector.getMessages(state),
});
const mapDispatchToProps = {
  initConnection: DataOperation.doConnectRequest,
};

export default hot(connect(mapStateToProps, mapDispatchToProps)(App));
