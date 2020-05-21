export default {
  visuallyHidden: {
    position: 'absolute',
    width: 1,
    height: 1,
    margin: -1,
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
  pageMain: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    paddingTop: 10,
    height: '100vh',
  },
  connectionStatus: {
    margin: 0,
    marginBottom: 5,
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
  messagesHistory: {
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
  li: {
    color: 'green',
  },
  sendMessageForm: {
    display: 'flex',
  },
  sendMessageFieldLabel: {
    flexGrow: 1,
  },
  sendMessageField: {
    width: '100%',
    height: '100%',
  },
  usersListColumn: {
    padding: 20,
    paddingTop: 10,
  },
  usersListTitle: {
    marginTop: 0,
    marginBottom: 5,
  },
  usersList: {
    marginTop: 0,
    paddingLeft: 0,
    listStyle: 'none',
  },
};
