import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { getTime } from '@/components/common/utils.js';
import { withStyles } from 'react-jss';
import styles from './chat-history-styles.js';

class ChatHistory extends PureComponent {
  constructor(props) {
    super(props);
    this.listRef = createRef();
  }

  getSnapshotBeforeUpdate(_prevProps, _prevState) {
    const list = this.listRef.current;
    if (!list) {
      return false;
    }
    const bottomPosition = list.scrollHeight - list.offsetHeight;
    const listWasScrolledToEnd = list.scrollTop === bottomPosition;
    return listWasScrolledToEnd;
  }

  componentDidUpdate(_prevProps, _prevState, listWasScrolledToEnd) {
    if (!listWasScrolledToEnd) {
      return;
    }
    const list = this.listRef.current;
    const bottomPosition = list.scrollHeight - list.offsetHeight;
    list.scrollTop = bottomPosition;
  }

  render() {
    const { messages, classes } = this.props;
    return (
      <section className={classes.chatHistory}>
        <h2 className={classes.visuallyHidden}>Messages history</h2>
        <ul className={classes.messagesList} ref={this.listRef}>
          {messages.map(({ timestamp, author, message }) => (
            <li key={timestamp} className={classes.message}>
              {`${getTime(timestamp)} ${author}: ${message}`}
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

ChatHistory.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  messages: PropTypes.arrayOf(
    PropTypes.exact({
      timestamp: PropTypes.number,
      author: PropTypes.string,
      message: PropTypes.string,
    }),
  ).isRequired,
};

export default withStyles(styles)(ChatHistory);
