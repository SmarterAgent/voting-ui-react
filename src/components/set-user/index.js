import React, { useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import SocketContext from '../../socket-context';

import GameRoom from '../game-room';

const SetUser = () => {
  const [user, setUser] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [displayRoom, setDisplayRoom] = useState(false);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('your-admin', () => {
      setIsAdmin(true);
    });
  }, [socket]);

  const addUser = () => {
    socket.emit('add-user', { name: user });
    setDisplayRoom(true);
  }

  return (
    <React.Fragment>
      {!displayRoom ? (
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="user-name"
                label="Name"
                value={user}
                onChange={event => setUser(event.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={addUser}
                disabled={user.length === 0}
              >
                Join Room
              </Button>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <GameRoom isAdmin={isAdmin} />
      )}
      
    </React.Fragment>
  )
};

export default SetUser;
