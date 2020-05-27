import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import styles from './users-styles.js';

const useStyles = createUseStyles(styles);

const UserList = ({ users }) => {
  const classes = useStyles();
  return (
    <section className={classes.users}>
      <h2 className={classes.usersTitle}>Participants:</h2>
      <ul className={classes.usersList}>
        {users.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </section>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

export default UserList;
