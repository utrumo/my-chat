import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import MainPage from '@/components/main-page/main-page.jsx';
import styles from './app-styles.js';

const useStyles = createUseStyles(styles);

const App = ({ initConnection }) => {
  useEffect(() => { initConnection(); }, []);
  const classes = useStyles();
  return (
    <MainPage className={classes['@@global']} />
  );
};

App.propTypes = {
  initConnection: PropTypes.func.isRequired,
};

export default App;
