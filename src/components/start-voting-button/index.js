import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const StartVotingButton = ({ startVoting }) => (
  <Button
    color="primary"
    variant="contained"
    onClick={startVoting}
  >
    Start Voting
  </Button>
);

StartVotingButton.propTypes = {
  startVoting: PropTypes.func.isRequired,
};

export default StartVotingButton;
