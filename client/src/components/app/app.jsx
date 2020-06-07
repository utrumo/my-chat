import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import MainPageContainer from '@/containers/main-page-container.jsx';
import styles from './app-styles.js';

const VERSION = process.env.CLIENT_VERSION; // eslint-disable-line no-undef
const useStyles = createUseStyles(styles);

const App = ({ sendConnectionRequest }) => {
  console.info(`Client version: ${VERSION}`); // eslint-disable-line no-console
  useEffect(() => { sendConnectionRequest(); }, []);
  const classes = useStyles();
  return (
    <MainPageContainer className={classes['@global']} />
  );
};

App.propTypes = {
  sendConnectionRequest: PropTypes.func.isRequired,
};

export default App;
