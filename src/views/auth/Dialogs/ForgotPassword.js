import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import {forgotPassword} from 'src/redux/actions/auth';

import {DialogWrapper} from 'src/components/Dialog';

const defaultValues = {
  account: '',
  userName: '',
}

export default function FormDialog(props) {

  const [values, setValues] = useState({...defaultValues});
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setValues({...values, [ e.target.name ]: e.target.value})
  }

  const handleForgotPassword = async () => {
    setLoading(true)    
    await forgotPassword(values)
    setLoading(false)
  }

  return (
    <div>
      <DialogWrapper loading={loading} open={props.open} handleClose={props.toggleDialog} handleConfirm={handleForgotPassword} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
            <Typography variant="h3" color="primary" style={{fontWeight:"normal"}}>
                Forgot Password
            </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter an account and a username, a link to recover password will be sent to the associated email address
          </DialogContentText>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="account"
              name="account"
              label="Account"
              onChange={handleChange}
              value={values.account}
              type="text"
              required
              fullWidth
            />
            <TextField
              margin="dense"
              id="userName"
              name="userName"
              label="Username"
              onChange={handleChange}
              value={values.userName}
              type="text"
              required
              fullWidth
            />
          </form>
        </DialogContent>
      </DialogWrapper>
    </div>
  );
}