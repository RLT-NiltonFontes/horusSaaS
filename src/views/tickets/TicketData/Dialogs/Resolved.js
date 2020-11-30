import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {useParams} from 'react-router-dom';
import { actionResolve } from 'src/redux/actions/tickets';
import {Dialog, DialogActions, DialogContent, Button, DialogTitle, TextField, Grid, Typography, CircularProgress} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Resolved = (props) => {
    let rootCause = ''
    const lng = props.lng ?? {};

    const params = useParams();

    useEffect(() => {
        rootCause = props.ticket?.rootCause ?? ''
    },[])

    const handleCloseDialog = (resetForm,) => {
        resetForm();
        props.handleClose();
    }

    return(
            <Formik
                initialValues={{
                    rootCause: rootCause,
                    resolution: '',
                }}
                validationSchema={Yup.object().shape({
                    rootCause: Yup.string().max(255).required('Root cause is required'),
                    resolution: Yup.string().max(255).required('Resolution is required'),
                })}
                onSubmit={  async (values, {resetForm, setSubmitting}) => {
                    console.log('here')
                    try{
                        await props.actionResolve(values, params.id).then(
                            status => {
                                if(status === 200){
                                    handleCloseDialog(resetForm);
                                }
                            }
                        );
                        setSubmitting(false)
                    }catch(err){ console.log(err)}
                }}
            >
                { ({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values,
                    resetForm
                }) =>( 
                    <Dialog open={props.open} onClose={() => handleCloseDialog(resetForm)} fullWidth>
                    <form noValidate onSubmit={handleSubmit} >
                        <DialogTitle> 
                            <Typography variant="h3" color="primary" style={{fontWeight:"normal"}}>
                                Resolve Ticket
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3}>
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        error={Boolean(touched.rootCause && errors.rootCause)}
                                        helperText={touched.rootCause && errors.rootCause}
                                        fullWidth
                                        onBlur={handleBlur}
                                        label={lng.rootCause ?? 'Root Cause'}
                                        name="rootCause"
                                        onChange={handleChange}
                                        required
                                        multiline
                                        rows={3}
                                        value={values.rootCause}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        error={Boolean(touched.resolution && errors.resolution)}
                                        helperText={touched.resolution && errors.resolution}
                                        fullWidth
                                        onBlur={handleBlur}
                                        label={lng.resolution ?? 'Resolution'}
                                        name="resolution"
                                        onChange={handleChange}
                                        required
                                        multiline
                                        rows={3}
                                        value={values.resolution}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleCloseDialog(resetForm)}> Cancel </Button>
                            <Button 
                            disabled={isSubmitting}
                            size="large"
                            type="submit"
                            endIcon={isSubmitting ? <CircularProgress size={20} /> : null}> OK </Button>
                        </DialogActions>
                    </form>
                    </Dialog>
                )}  
            </Formik>
    )
}

const mapDispatchToProps = dispatch => ({
    actionResolve: (data, ticketID) => dispatch(actionResolve(data, ticketID)),
})

export default connect(null, mapDispatchToProps)(Resolved);