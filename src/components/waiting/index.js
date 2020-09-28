import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const Waiting = ({message}) => (
  <React.Fragment>
    <CircularProgress />
    <Typography variant="h5" gutterBottom>
      {message}
    </Typography>
  </React.Fragment>
);

Waiting.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Waiting;
