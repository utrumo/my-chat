import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { DataSelector } from '../redux';

const useStyles = createUseStyles({
  li: {
    color: 'green',
  },
});

const App = ({ messages }) => {
  const classes = useStyles();
  return (
    <>
      <h1>Hello world</h1>
      <ul>
        {messages.map(({ id, message }) => (
          <li key={id} className={classes.li}>{message}</li>
        ))}
      </ul>
    </>
  );
};

App.propTypes = {
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

export default connect(mapStateToProps)(App);
