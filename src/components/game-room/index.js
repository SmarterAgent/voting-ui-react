import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import SocketContext from '../../socket-context';

import Results from '../results';
import StartVotingButton from '../start-voting-button';
import UserList from '../user-list';
import VoteButton from '../vote-button';
import Waiting from '../waiting';

const GameRoom = ({isAdmin}) => {
  const [waiting, setWaiting] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [votes, setVotes] = useState([]);
  const [votingStarted, setVotingStarted] = useState(false);
  const [waitingMessage, setWaitingMessage] = useState('Waiting for voting to start...');
  const socket = useContext(SocketContext);

  const submitVote = value => {
    socket.emit('user-voted', value);
    setWaitingMessage('Waiting for everyone to vote...');
    setWaiting(true);
  };

  useEffect(() => {
    socket.on('all-voted', allVotes => {
      setWaiting(false);
      setShowResults(true);
      setVotes(allVotes);
    });

    socket.on('voting-started', () => {
      setWaiting(false);
      setVotingStarted(true);
    });

    socket.on('voting-reset', () => {
      setWaitingMessage('Waiting for voting to start...');
      setWaiting(true);
      setShowResults(false);
      setVotes([]);
      setVotingStarted(false);
    });
  }, [socket]);

  const startVoting = () => {
    socket.emit('start-voting');
  }

  return (
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <UserList />
        </Grid>

        <Grid item xs={10}>
          {!waiting && showResults && <Results votes={votes} isAdmin={isAdmin} />}
          {!waiting && !showResults && (
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <VoteButton value={1} submitVote={submitVote} />
                </Grid>

                <Grid item xs={6}>
                  <VoteButton value={3} submitVote={submitVote} />
                </Grid>

                <Grid item xs={6}>
                  <VoteButton value={5} submitVote={submitVote} />
                </Grid>

                <Grid item xs={6}>
                  <VoteButton value={10} submitVote={submitVote} />
                </Grid>
              </Grid>
            </React.Fragment>
          )}
          {waiting && !showResults && <Waiting message={waitingMessage}/>}
          {isAdmin && !votingStarted && <StartVotingButton startVoting={startVoting} />}
        </Grid>
      </Grid>
  );
}

GameRoom.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default GameRoom;
