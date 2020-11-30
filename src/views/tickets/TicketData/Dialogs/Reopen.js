import React, {useState} from 'react';
import { connect } from 'react-redux';
import {useParams} from 'react-router-dom';
import { actionReopen } from 'src/redux/actions/tickets';
import {Dialog, DialogActions, DialogContent, Button, DialogTitle, TextField, Grid, Typography, CircularProgress} from '@material-ui/core';
import { Formik, FormikComputedProps } from 'formik';
import * as Yup from 'yup';

const defaultValues = {
    reopenReason: '',
}

const Reopen = (props) => {
    const lng = props.lng ?? {}

    const params = useParams();

    const handleCloseDialog = (resetForm,) => {
        resetForm();
        props.handleClose();
    }

    return(
            <Formik
                initialValues={defaultValues}
                validationSchema={Yup.object().shape({
                    reopenReason: Yup.string().max(255).required('reopenReason  is required'),
                })}
                onSubmit={  async (values, {resetForm, setSubmitting}) => {
                    try{
                        await props.actionReopen(values, params.id).then(
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
                                    Reopen Ticket
                                </Typography>
                            </DialogTitle>
                            <DialogContent>
                                <Grid container spacing={3}>
                                    <Grid item md={12} xs={12}>
                                        <TextField
                                            error={Boolean(touched.reopenReason && errors.reopenReason)}
                                            helperText={touched.reopenReason && errors.reopenReason}
                                            fullWidth
                                            onBlur={handleBlur}
                                            label={lng.reopenReason ?? 'reopenReason'}
                                            name="reopenReason"
                                            onChange={handleChange}
                                            required
                                            multiline
                                            rows={3}
                                            value={values.reopenReason}
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
                                endIcon={isSubmitting ? <CircularProgress size={20}/> : null }> OK </Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                )}
            </Formik>
    )
}

const mapDispatchToProps = dispatch => ({
    actionReopen: (data, ticketID) => dispatch(actionReopen(data, ticketID)),
})

export default connect(null, mapDispatchToProps)(Reopen);