import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {login, logout} from 'src/redux/actions/auth'
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  makeStyles,
  Card,
} from '@material-ui/core';
import BackgroundImage from 'src/assets/images/home_page/background.png';
import RLLogo from 'src/assets/images/home_page/logotipo_rlt.png';
import ProductBrand from 'src/assets/images/home_page/portal_cliente.png';
import Footer1 from 'src/assets/images/home_page/footer1.png';

import ForgotPW from './Dialogs/ForgotPassword';

const useStyles = makeStyles((theme) => ({
    cardRoot: {
      display: 'block',
      backgroundColor: 'rgba(255,255,255,0)'
    },
    imagesContainer: {
      width: '100%',
      alignItems:'center'
    },
    cover: {
    },
    details: {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center'
    },
  }));

const LoginView = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [forgotPassword, setForgotPassword] = useState(false)
    /* const logout = props.logout;
    useEffect(() => {
      logout()
    }, [props.auth?.authToken]) */
  
    const toggleDialog = () => {
      setForgotPassword(!forgotPassword)
    }
    return (
      <Container>
        <ForgotPW open={forgotPassword} toggleDialog={toggleDialog}/>
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Container maxWidth="sm">
            <Card style={{backgroundColor:'rgba(255,255,255,1)', padding: '16px', textAlign:'center'}}>
            <Formik
              initialValues={{
                userName: 'scenter',
                password: 'scenter',
                account: '',
              }}
              validationSchema={Yup.object().shape({
                userName: Yup.string().max(255).required('Username is required'),
                password: Yup.string().max(255).required('Password is required')
              })}
              onSubmit={async (values) => {
                await props.login(values)
                navigate('/app/dashboard', { replace: true });
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
                <form onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <Typography
                      color="textPrimary"
                      variant="h2"
                    >
                      Sign in
                    </Typography>
                  </Box>
                  <Box className={classes.cardRoot}>
                    <Grid container className={classes.imagesContainer}>
                      <Grid item md={3} xs={12}><img src={`${RLLogo}`} style={{maxWidth:'100%'}} /></Grid>
                      <Grid item md={9} xs={12}><img src={`${ProductBrand}`} style={{maxWidth:'100%'}} /></Grid>
                    </Grid>
                  </Box>
                  
                  <Box
                    mt={3}
                    mb={1}
                  >
                  </Box>
                  <TextField
                    fullWidth
                    label="Account"
                    margin="normal"
                    name="account"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.account}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.userName && errors.userName)}
                    fullWidth
                    helperText={touched.userName && errors.userName}
                    label="Email Address"
                    margin="normal"
                    name="userName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.userName}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign in now
                    </Button>
                  </Box>
                  <Typography
                    color="primary"
                    onAuxClickCapture
                    variant="body1"
                    onClick={() => toggleDialog()}
                  >
                    Forgot your password
                  </Typography>
                  
                </form>
              )}
            </Formik>
            
              <Typography>
                Terms & Condition | Privacy Policy | Cookie Policy
              </Typography>
              <img src={`${Footer1}`} />
            </Card>
          </Container>
        </Box>
      </Container>
    );
  };

  
const mapStateToProps = state => ({
    auth: state.auth,
  })
  const mapDispatchToProps = (dispatch) => ({
    login: (loginData) => dispatch(login(loginData)),
    logout: () => dispatch(logout())
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
  