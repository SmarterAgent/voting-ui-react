import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

const VoteButton = ({ value, submitVote }) => (
  <React.Fragment>
    <Button
      variant="contained"
      color="primary"
      onClick={() => submitVote(value)}
      fullWidth
      size="large"
    >
      {value}
    </Button>
  </React.Fragment>
);

VoteButton.propTypes = {
  value: PropTypes.number.isRequired,
  submitVote: PropTypes.func.isRequired
};

export default VoteButton;
