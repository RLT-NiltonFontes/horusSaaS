import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
import BackgroundImage from 'src/assets/images/home_page/background.png';
import RLLogo from 'src/assets/images/home_page/logotipo_rlt.png';
import ProductBrand from 'src/assets/images/home_page/portal_cliente.png';
import Footer1 from 'src/assets/images/home_page/footer1.png';

import ForgotPW from './Dialogs/ForgotPassword'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    backgroundImage: 'url('+BackgroundImage+')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
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

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [forgotPassword, setForgotPassword] = useState(true)

  const toggleDialog = () => {
    setForgotPassword(!forgotPassword)
  }
  return (
    <Page
      className={classes.root}
      title="Login"
    >
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
              email: 'demo@devias.io',
              password: 'Password123',
              account: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={() => {
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
                    <Grid item md={3} xs={12}><img src={`${RLLogo}`} style={{maxHeight:'151px'}} /></Grid>
                    <Grid item md={9} xs={12}><img src={`${ProductBrand}`} style={{maxHeight:'151px'}} /></Grid>
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
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
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
    </Page>
  );
};

export default LoginView;
