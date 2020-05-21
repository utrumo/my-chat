import { visuallyHidden } from '@/components/common/common-styles.js';

export default {
  visuallyHidden,
  chatHistory: {
    display: 'flex',
    flexGrow: 1,
    overflowY: 'hidden',
    border: '1px solid red',
    borderTop: 'none',
    borderLeft: 'none',
  },
  messagesList: {
    flexGrow: 1,
    overflowY: 'auto',
    listStyle: 'none',
  },
  message: {
    color: 'green',
  },
};
