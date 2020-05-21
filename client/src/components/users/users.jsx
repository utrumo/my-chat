import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './users-styles.js';

const useStyles = createUseStyles(styles);

const UserList = () => {
  const classes = useStyles();
  return (
    <section className={classes.users}>
      <h2 className={classes.usersTitle}>Participants:</h2>
      <ul className={classes.usersList}>
        <li>first user</li>
        <li>second user</li>
      </ul>
    </section>
  );
};

export default UserList;
