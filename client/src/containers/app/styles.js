export default {
  visuallyHidden: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    margin: '-1px',
    border: 0,
    padding: 0,
    whiteSpace: 'nowrap',
    clipPath: 'inset(100%)',
    clip: 'rect(0 0 0 0)',
    overflow: 'hidden',
  },
  '@global': {
    body: {
      margin: 0,
      boxSizing: 'border-box',
    },
    '*, ::after, ::before': {
      boxSizing: 'inherit',
    },
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    height: '100vh',
  },
  wrapper: {
    display: 'flex',
    flexGrow: 1,
    overflowY: 'hidden',
    border: '3px solid blue',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  chatHistory: {
    display: 'flex',
    flexGrow: 1,
    overflowY: 'hidden',
    border: '1px solid red',
  },
  messageList: {
    flexGrow: 1,
    overflowY: 'auto',
    listStyle: 'none',
  },
  li: {
    color: 'green',
  },
};
