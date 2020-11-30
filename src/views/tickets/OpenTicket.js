import React, {useState} from 'react';
import {connect} from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Divider, CardHeader, TextField, Box, Button, makeStyles, Snackbar, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {openTicket} from 'src/redux/actions/tickets';

import strings from 'src/languages/openTickets';

const states = [];
const useStyles = makeStyles(() => ({
    root: {},
    title: {
      marginRight: 'auto',
      width: 'auto'
    },
    actions: {
      marginLeft: 'auto'
    }
  }));

const OpenTicket = ({className, openTicket, ...rest}) => {

    const lng = strings.pt;
    const navigate = useNavigate();
    const classes = useStyles();
    const [alert, setAlert] = React.useState('success')
    const [open, setOpen] = React.useState(false);
    
    const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const alerts = {
      success: <Alert onClose={handleCloseAlert} severity="success">
                {lng.onOpenSuccess}
              </Alert>,
      error: <Alert onClose={handleCloseAlert} severity="error">
                {lng.onOpenError}
              </Alert>,
    }
        return (
            <Container maxWidth={false}>
              <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseAlert} l>
                {alerts[alert]}
              </Snackbar>
              <Formik
                initialValues={{
                  rlString: '',
                  clientTicket: '',
                  clientExtraNotes: '',
                  address: '',
                  assets: '',
                  description: '',
                }}
                validationSchema={Yup.object().shape({
                  rlString: Yup.string().max(255).required('Email is required'),
                  clientTicket: Yup.string().max(255).required('ID interno is required'),
                  clientExtraNotes: Yup.string().max(255).required('Password is required'),
                  address: Yup.string().max(255).required('Morada is required'),
                  description: Yup.string().max(255).required('Descrição is required'),
                })}
                onSubmit={ async (values, formikBag) => {
                  const response = await openTicket(values)
                  if(response.status === 200){
                    setAlert('success')
                    navigate('/app/tickets/'+response.ticketID)
                  }else{
                    setAlert('error')
                  }
                  setOpen(true)
                  formikBag.setSubmitting(false)
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values
                }) => (
                  <form
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <Card>
                    <CardHeader
                      title={lng.pageTitle}
                      action={
                        <Button color="primary" variant="contained"
                          disabled={isSubmitting}
                          size="large"
                          type="submit"
                          endIcon={isSubmitting ? <CircularProgress /> : null}
                          > {lng.openButton} </Button>
                      }
                    />
                    <Divider />
                    <CardContent>
                      <Grid
                        container
                        spacing={3}
                      >
                        <Grid item md={3} xs={12}>
                          <TextField
                            error={Boolean(touched.rlString && errors.rlString)}
                            helperText={touched.rlString && errors.rlString}
                            fullWidth
                            onBlur={handleBlur}
                            label={lng.rlString}
                            name="rlString"
                            onChange={handleChange}
                            required
                            value={values.rlString}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={3} xs={12}>
                          <TextField
                            error={Boolean(touched.clientTicket && errors.clientTicket)}
                            helperText={touched.clientTicket && errors.clientTicket}
                            fullWidth
                            onBlur={handleBlur}
                            label={lng.clientTicket}
                            name="clientTicket"
                            onChange={handleChange}
                            required
                            value={values.clientTicket}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.clientExtraNotes && errors.clientExtraNotes)}
                            helperText={touched.clientExtraNotes && errors.clientExtraNotes}
                            fullWidth
                            onBlur={handleBlur}
                            label={lng.clientExtraNotes}
                            name="clientExtraNotes"
                            onChange={handleChange}
                            required
                            value={values.clientExtraNotes}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            error={Boolean(touched.address && errors.address)}
                            helperText={touched.address && errors.address}
                            fullWidth
                            onBlur={handleBlur}
                            label={lng.address}
                            name="address"
                            onChange={handleChange}
                            type="number"
                            required
                            value={values.address}
                            variant="outlined"
                            multiline
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            error={Boolean(touched.assets && errors.assets)}
                            helperText={touched.assets && errors.assets}
                            fullWidth
                            onBlur={handleBlur}
                            label={lng.assets}
                            name="assets"
                            onChange={handleChange}
                            required
                            value={values.assets}
                            variant="outlined"
                            multiline
                            rows={5}
                          />
                        </Grid>
                        <Grid item md={8} xs={12}>
                          <TextField
                            error={Boolean(touched.description && errors.description)}
                            helperText={touched.description && errors.description}
                            fullWidth
                            onBlur={handleBlur}
                            label={lng.description}
                            name="description"
                            onChange={handleChange}
                            required
                            value={values.description}
                            variant="outlined"
                            multiline
                            rows={5}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      p={2}
                    >
                      {/* <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                      >
                        Save details
                      </Button> */}
                    </Box>
                  </Card>
                </form>
                )}
            </Formik>
                
            </Container>
    )
}

const mapDispatchToProps = dispatch => ({
  openTicket: (data) => dispatch(openTicket(data))
})

export default connect(null, mapDispatchToProps)(OpenTicket);
