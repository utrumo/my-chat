import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import styles from './connection-status-styles.js';

const useStyles = createUseStyles(styles);

const ConnectionStatus = ({ connection: { status, code, delay } }) => {
  const classes = useStyles();
  const delayInSeconds = delay / 1000;
  const unit = delayInSeconds < 1 ? 'second' : 'seconds';
  const message = code
    ? `${status}. Error ${code}. Next connection attempt in ${delayInSeconds} ${unit}...`
    : status;
  return (
    <section>
      <h2 className={classes.visuallyHidden}>Connection status</h2>
      <label>
        <span>Status: &nbsp;</span>
        <output>{message}</output>
      </label>
    </section>
  );
};

ConnectionStatus.propTypes = {
  connection: PropTypes.exact({
    status: PropTypes.string.isRequired,
    code: PropTypes.number,
    delay: PropTypes.number,
  }).isRequired,
};

export default ConnectionStatus;
