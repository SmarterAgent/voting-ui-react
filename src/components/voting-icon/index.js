import React from 'react';
import PropTypes from 'prop-types';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';

const VotingIcon = ({ hasVoted }) => {
  const color = hasVoted ? 'green' : 'red';

  return (
    <FiberManualRecord style={{ color }} />
  );
};

VotingIcon.propTypes = {
  hasVoted: PropTypes.bool.isRequired,
};

export default VotingIcon;
