import React, {useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Dialog, DialogActions, DialogContent, Button, DialogTitle, Box, Grid, Typography, TextField} from '@material-ui/core';
import {Rating} from '@material-ui/lab';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {addFileToTicket} from 'src/redux/actions/tickets';

const FileUpload = (props) => {
    const params = useParams();
    const lng = props.lng ?? {}

    const [values, setValues] = useState({
        file: null,
        comment: '',
    })

    const handleChange = (event) => {
        const newValues = {...values};
        if(event.target.name === 'file') newValues['file'] = event.target.files[0];
        else newValues[event.target.name] = event.target.value;
        setValues(newValues)
    }

    const handleConfirm = () => {
        addFileToTicket(values, params.id).then(
            response => console.log(response)
        )
    }

    const resetForm = () => {
        setValues({
            file: null,
            comment: '',
        })
        props.handleClose();
    }

    return(
        <Dialog open={props.open} onClose={resetForm} fullWidth>
                <DialogTitle> 
                    <Typography variant="h3" color="primary" style={{fontWeight:"normal"}}>
                        {lng.filesDialogTitle}
                    </Typography>
                </DialogTitle>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleConfirm();
                }}>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item md={12} xs={12}>
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <Typography component="legend">{lng.file}</Typography>
                                    <TextField
                                        name="file"
                                        type="file"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <TextField
                                    fullWidth
                                    label={lng.fileComment ?? 'Comment'}
                                    name="comment"
                                    onChange={(event) => handleChange(event)}
                                    required
                                    multiline
                                    rows={3}
                                    value={values.comment}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={resetForm}> {lng.cancelButton} </Button>
                        <Button 
                        size="large"
                        type="submit"> OK </Button>
                    </DialogActions>
                </form>
        </Dialog>
    )
}

export default FileUpload;