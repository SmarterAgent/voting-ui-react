import React, { useContext, useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SocketContext from '../../socket-context';

import VotingIcon from '../voting-icon';

const UserList = () => {
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('list-users', users => {
      setUsers(users);
    });
  }, [socket]);

  return (
    <React.Fragment>
      <List>
        {users.map(user => (
          <ListItem key={user.id}>
            <ListItemText primary={user.name} />
            <ListItemIcon>
              <VotingIcon hasVoted={user.hasVoted} />
            </ListItemIcon>
            <ListItemText primary={user.vote} />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};

export default UserList;
