import { visuallyHidden } from '@/components/common/common-styles.js';

export default {
  visuallyHidden,
  wrapper: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(206, 206, 206, 0.81)',
  },
  container: {
    padding: '20px 24px 15px',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  title: {
    margin: 0,
  },
  buttonContainer: {
    textAlign: 'right',
    margin: 0,
  },
};
