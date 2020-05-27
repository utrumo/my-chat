import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import styles from './connection-status-styles.js';

const useStyles = createUseStyles(styles);

const ConnectionStatus = (props) => {
  const {
    connection: { status, code, delay },
    isAuthorizationRequired,
    userName,
    logoutUser,
  } = props;
  const classes = useStyles();
  const delayInSeconds = delay / 1000;
  const unit = delayInSeconds < 1 ? 'second' : 'seconds';
  const message = code
    ? `${status}. Error ${code}. Next connection attempt in ${delayInSeconds} ${unit}...`
    : status;
  const welcomeMessage = isAuthorizationRequired
    ? 'You haven\'t logged in yet'
    : `Welcome ${userName}!`;
  return (
    <section className={classes.wrapper}>
      <h2 className={classes.visuallyHidden}>Connection status</h2>
      <p className={classes.paragraph}>
        <span>Status: &nbsp;</span>
        <output>{message}</output>
      </p>
      <p className={classes.paragraph}>{welcomeMessage}</p>
      <button type="button" onClick={logoutUser} disabled={isAuthorizationRequired}>Logout</button>
    </section>
  );
};

ConnectionStatus.propTypes = {
  connection: PropTypes.exact({
    status: PropTypes.string.isRequired,
    code: PropTypes.number,
    delay: PropTypes.number,
  }).isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default ConnectionStatus;
