import React, {useState} from 'react';
import {connect} from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Divider, CardHeader, TextField, Box, Button, makeStyles, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {openTicket} from 'src/redux/actions/tickets'

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
                Open with success
              </Alert>,
      error: <Alert onClose={handleCloseAlert} severity="error">
                Failed to add
              </Alert>,
    }
        return (
            <Container maxWidth={false}>
              <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseAlert} l>
                {alerts[alert]}
              </Snackbar>
              <Formik
                initialValues={{
                  rlString: 'CODE 1232143 3',
                  clientTicket: 'CLIENT TICKET 31221',
                  clientExtraNotes: 'EXTRA 12312 ',
                  address: 'Lisbon, Portugal',
                  description: 'Desc12312',
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
                  if(response === 200){
                    setAlert('success')
                    formikBag.resetForm()
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
                      title="Open Ticket"
                      action={
                        <Button color="primary" variant="contained"
                          disabled={isSubmitting}
                          size="large"
                          type="submit"
                          > Criar </Button>
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
                            label="Contrato"
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
                            label="ID Interno"
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
                            label="Breve Título"
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
                            label="Morada"
                            name="address"
                            onChange={handleChange}
                            type="number"
                            required
                            value={values.address}
                            variant="outlined"
                            multiline
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            error={Boolean(touched.description && errors.description)}
                            helperText={touched.description && errors.description}
                            fullWidth
                            onBlur={handleBlur}
                            label="Descrição"
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
