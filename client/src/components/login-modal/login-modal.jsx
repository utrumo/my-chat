import React, { useRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import Portal from '@/components/portal/portal.jsx';
import styles from './login-modal-styles.js';

const MAX_MESSAGE_LENGTH = 100;

const useStyles = createUseStyles(styles);

const LoginModal = ({ authorize }) => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const onChange = useCallback((evt) => {
    setName(evt.target.value.trim());
  }, []);

  const formRef = useRef();
  const onSubmit = useCallback((evt) => {
    evt.preventDefault();
    authorize(name);
  }, [name]);

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
                  value={name}
                  onChange={onChange}
                  placeholder="Your name"
                  maxLength={MAX_MESSAGE_LENGTH}
                  autoFocus
                  required
                />
              </label>
            </p>
            <p className={classes.buttonContainer}>
              <button type="submit" disabled={!name}>Enter</button>
            </p>
          </form>
        </div>
      </section>
    </Portal>
  );
};

LoginModal.propTypes = {
  authorize: PropTypes.func.isRequired,
};

export default LoginModal;
