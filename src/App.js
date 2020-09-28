import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import SocketContext from './socket-context';
import io from 'socket.io-client';

import tiger from './img/tiger-outline.png';

import SetUser from './components/set-user';

const server = process.env.NODE_ENV === 'production' ? 'https://voting-poker-server.herokuapp.com/lobby' : 'http://localhost:3001/lobby';
const socket = io(server);

window.addEventListener('unload', () => {
  socket.emit('bye-bye');
});

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2)
  }
}));

const App = () => {
  const classes = useStyles();

  return (
    <SocketContext.Provider value={socket}>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <img src={tiger} alt="Tiger Team" height="50" width="50" />
          <Typography variant="h6"> &nbsp;&nbsp;&nbsp; Voting Poker</Typography>
        </Toolbar>
      </AppBar>
      <SetUser />
    </SocketContext.Provider>
  );
}

export default App;
