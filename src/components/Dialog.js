import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Footer1 from 'src/assets/images/home_page/footer1.png';
import PropTypes from 'prop-types'
import { CircularProgress } from '@material-ui/core';

export const DialogWrapper = (props) => {
    
    const onClickConfirm = async () => {
      props.handleConfirm()
    }

    return (
        <Dialog open={props.open} onClose={props.loading ? props.handleClose : null} aria-labelledby="form-dialog-title">
            {props.children}
            <div style={{textAlign:"center", marginTop:"16px"}}>
                <img src={`${Footer1}`} />
            </div>
        <DialogActions>
            
          {
            props.loading ? <CircularProgress /> : (
              <React.Fragment>
                <Button onClick={props.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={onClickConfirm} color="primary">
                  Ok
                </Button>
              </React.Fragment>
            )
          }
        </DialogActions>
      </Dialog>
    )
}

DialogWrapper.propTypes = {
    handleClose: PropTypes.func,
    handleConfirm: PropTypes.func,
    open: PropTypes.bool,
    loading: PropTypes.bool
}
