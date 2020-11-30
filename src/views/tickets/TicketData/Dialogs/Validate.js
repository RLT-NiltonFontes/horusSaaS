import React, {useState} from 'react';
import { connect } from 'react-redux';
import {useParams} from 'react-router-dom';
import { actionValidate } from 'src/redux/actions/tickets';
import {Dialog, DialogActions, DialogContent, Button, DialogTitle, Box, Grid, Typography, TextField, CircularProgress} from '@material-ui/core';
import {Rating} from '@material-ui/lab';
import { Formik } from 'formik';
import * as Yup from 'yup';

const defaultValues = {
    rating1: 1,
    rating2: 1,
    rating3: 1,
    ratingComment: ''
}

const Validate = (props) => {
    const lng = props.lng ?? {};
    
    const [values, setValues] = useState({...defaultValues})
    const [loading, setLoading] = useState(false);

    const params = useParams();

    const handleChange = (event) => {
        const newValues = {...values};
        newValues[event.target.name] = event.target.value;
        setValues(newValues)
    }

    const handleCloseDialog = () => {
        setValues(defaultValues)
        props.handleClose();
    }

    const handleConfirm = async () => {
        setLoading(true)
        await props.actionValidate(values, params.id).then(
            status => {
                if(status === 200){
                    handleCloseDialog();
                }
            }
        )
        setLoading(false)
    }
    return(
        <Dialog open={props.open} onClose={handleCloseDialog} fullWidth>
                <DialogTitle> 
                    <Typography variant="h3" color="primary" style={{fontWeight:"normal"}}>
                        Reopen Ticket
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend">Acopanhamento</Typography>
                                <Rating
                                name="rating1"
                                value={values.rating1}
                                onChange = {(event, newValue) => {
                                    handleChange(event);
                                }}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend">Conhecimento Técnico</Typography>
                                <Rating
                                name="rating2"
                                value={values.rating2}
                                onChange = {(event, newValue) => {
                                    handleChange(event);
                                }}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend">Rapidez</Typography>
                                <Rating
                                name="rating3"
                                value={values.rating3}
                                onChange = {(event, newValue) => {
                                    handleChange(event);
                                }}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <TextField
                                fullWidth
                                label={lng.reopenReason ?? 'ratingComment'}
                                name="ratingComment"
                                onChange={(event) => handleChange(event)}
                                required
                                multiline
                                rows={3}
                                value={values.ratingComment}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleCloseDialog}> Cancel </Button>
                    <Button 
                    size="large" 
                    onClick={handleConfirm}
                    endIcon={loading ? <CircularProgress size={20} /> : null}> OK </Button>
                </DialogActions>
        </Dialog>
    )
}

const mapDispatchToProps = dispatch => ({
    actionValidate: (data, ticketID) => dispatch(actionValidate(data, ticketID)),
})

export default connect(null, mapDispatchToProps)(Validate);