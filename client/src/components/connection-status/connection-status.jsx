import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './connection-status-styles.jsx';

const useStyles = createUseStyles(styles);

const ConnectionStatus = () => {
  const classes = useStyles();
  return (
    <section>
      <h2 className={classes.visuallyHidden}>Connection status</h2>
      <label>
        <span>Connection status:&nbsp;</span>
        <output>idle</output>
      </label>
    </section>
  );
};

export default ConnectionStatus;
