import React from 'react'
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';


const SnackbarComponent = (type, message) => {

    const [open, setOpen] = React.useState(true);
    const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const alerts = {
        success: <Alert onClose={handleCloseAlert} severity="success">
                    {message}
                </Alert>,
        error: <Alert onClose={handleCloseAlert} severity="error">
                    {message}
                </Alert>,
        info: <Alert onClose={handleCloseAlert} severity="info">
                    {message}
                </Alert>,
        warning: <Alert onClose={handleCloseAlert} severity="warning">
                    {message}
                </Alert>
    }

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseAlert} l>
            {alerts[type]}
        </Snackbar>
    )
}

export default SnackbarComponent
