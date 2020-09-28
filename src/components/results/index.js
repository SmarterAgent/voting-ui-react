import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';

import { Doughnut } from 'react-chartjs-2';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import SocketContext from '../../socket-context';

const ResetVotingButton = ({ sendReset }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={sendReset}
  >
    Restart Voting
  </Button>
)

const Results = ({votes, isAdmin}) => {
  const [data, setData] = useState({ data: {datasets: [], labels: [] }});
  const socket = useContext(SocketContext);

  useEffect(() => {
    const labels = ['1', '3', '5', '10'];
    const voteTotals = [0, 0, 0, 0];

    votes.forEach(vote => {
      if (vote === 1) {
        voteTotals[0] = voteTotals[0] + 1;
      }
  
      if (vote === 3) {
        voteTotals[1] = voteTotals[1] + 1;
      }
  
      if (vote === 5) {
        voteTotals[2] = voteTotals[2] + 1;
      }
  
      if (vote === 10) {
        voteTotals[3] = voteTotals[3] + 1;
      }
    });

    setData({
      labels,
      datasets: [{
        data: voteTotals,
        backgroundColor: randomColor({
          luminosity: 'bright',
          count: 4,
        })
      }]
    });
  }, [votes]);

  const sendReset = () => {
    socket.emit('reset');
  };

  return (
    <React.Fragment>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Doughnut data={data} height='50%' />
        </Grid>

        <Grid item xs={12}>
          {isAdmin && <ResetVotingButton sendReset={sendReset} />}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Results.propTypes = {
  votes: PropTypes.arrayOf(PropTypes.number),
  isAdmin: PropTypes.bool.isRequired,
};

export default Results;
