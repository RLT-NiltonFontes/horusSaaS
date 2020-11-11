import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import Footer1 from 'src/assets/images/home_page/footer1.png';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.toggleDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
            <Typography variant="h3" color="primary" style={{fontWeight:"normal"}}>
                Forgot Password
            </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter an account and a username, a link to recover password will be sent to the associated email address
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
        />
        <div style={{textAlign:"center", marginTop:"16px"}}>
            <img src={`${Footer1}`} />
        </div>
        </DialogContent>
        <DialogActions>
            
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Request
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}