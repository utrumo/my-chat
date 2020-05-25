import React, { useRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import styles from './send-message.styles.js';

const KEY_ENTER = 'Enter';
const MAX_MESSAGE_LENGTH = 2000;

const useStyles = createUseStyles(styles);

const SendMessage = ({ sendMessage }) => {
  const classes = useStyles();

  const formRef = useRef();
  const onKeyDown = useCallback((evt) => {
    if (evt.shiftKey && evt.key === KEY_ENTER) {
      evt.preventDefault();
      formRef.current.requestSubmit();
    }
  }, []);

  const [value, setValue] = useState('');
  const onChange = useCallback((evt) => {
    const clearedValue = evt.target.value.replace(/^\s+/, '');
    setValue(clearedValue);
  }, []);
  const onSubmit = useCallback((evt) => {
    evt.preventDefault();
    sendMessage(value);
    setValue('');
  }, [value]);

  /* eslint-disable jsx-a11y/no-autofocus */
  return (
    <section>
      <h2 className={classes.visuallyHidden}>Send message form</h2>
      <form className={classes.sendMessageForm} ref={formRef} onSubmit={onSubmit}>
        <label className={classes.sendMessageFieldLabel}>
          <span className={classes.visuallyHidden}>Type a message</span>
          <textarea
            className={classes.sendMessageField}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="Type a message"
            autoComplete="off"
            maxLength={MAX_MESSAGE_LENGTH}
            autoFocus
            required
          />
        </label>
        <button
          type="submit"
          disabled={!value}
          title="Press or <Shift>+<Enter> to send"
        >
          Send
        </button>
      </form>
    </section>
  );
};

SendMessage.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default SendMessage;
