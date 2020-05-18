import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DataSelector } from '../redux';

const App = ({ messages }) => (
  <>
    <h1>Hello world</h1>
    <ul>
      {messages.map(({ id, message }) => (
        <li key={id}>{message}</li>
      ))}
    </ul>
  </>
);

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
