import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('+BackgroundImage+')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  cardRoot: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0)'
  },
  cardContent: {
    display: 'flex',
    width: '100%',
    height: 151,
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

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Card style={{backgroundColor:'rgba(255,255,255,1)', padding: '16px'}}>
          <Formik
            initialValues={{
              email: 'demo@devias.io',
              password: 'Password123'
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
                  <div className={classes.details}>
                    <CardContent className={classes.cardContent}>
                      <img src={`${RLLogo}`} style={{height:'100%'}} />
                      <img src={`${ProductBrand}`} style={{height:'100%'}} />
                    </CardContent>
                    <div>
                    </div>
                  </div>
                </Box>
                
                <Box
                  mt={3}
                  mb={1}
                >
                </Box>
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
                  color="textSecondary"
                  variant="body1"
                >
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Forgot your password?
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
          </Card>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
