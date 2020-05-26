import React, { useRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import Portal from '@/components/portal/portal.jsx';
import styles from './login-modal-styles.js';

const MAX_MESSAGE_LENGTH = 100;

const useStyles = createUseStyles(styles);

const LoginModal = ({ sendMessage }) => {
  const classes = useStyles();

  const [value, setValue] = useState('');
  const onChange = useCallback((evt) => {
    setValue(evt.target.value.trim());
  }, []);

  const formRef = useRef();
  const onSubmit = useCallback((evt) => {
    evt.preventDefault();
    sendMessage(value);
  }, [value]);

  /* eslint-disable jsx-a11y/no-autofocus */
  return (
    <Portal>
      <section className={classes.wrapper}>
        <div className={classes.container}>
          <h2 className={classes.title}>Enter your name</h2>
          <form ref={formRef} onSubmit={onSubmit}>
            <p className={classes.p}>
              <label>
                <span className={classes.visuallyHidden}>Your name</span>
                <input
                  type="text"
                  value={value}
                  onChange={onChange}
                  placeholder="Your name"
                  maxLength={MAX_MESSAGE_LENGTH}
                  autoFocus
                  required
                />
              </label>
            </p>
            <p className={classes.buttonContainer}>
              <button type="submit" disabled={!value}>Enter</button>
            </p>
          </form>
        </div>
      </section>
    </Portal>
  );
};

LoginModal.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default LoginModal;
