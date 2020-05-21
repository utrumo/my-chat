import { visuallyHidden } from '@/components/common/common-styles.js';

export default {
  visuallyHidden,
  pageMain: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    paddingTop: 15,
    height: '100vh',
  },
  chatColumns: {
    display: 'flex',
    flexGrow: 1,
    overflowY: 'hidden',
    border: '3px solid blue',
  },
  messagesColumn: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
};
