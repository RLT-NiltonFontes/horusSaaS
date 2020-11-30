import 'react-perfect-scrollbar/dist/css/styles.css';
import 'src/theme/main.css'
import React, {useEffect} from 'react';
import { useRoutes, useNavigate, useHistory} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

import { connect, } from 'react-redux';
import {checkAuthStatus} from 'src/redux/actions/auth'


const App = (props) => {
  const routing = useRoutes(routes);
  const navigate = useNavigate();
  useEffect( async () => {
    console.log('App')
    if(!localStorage.getItem('AUTH-TOKEN')){
      navigate('/login')
    }else{
      console.log('else')
      const res = await props.checkAuthStatus()
      console.log('app', res)
    }
  },[])
  return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
})
const mapDispatchToProps = dispatch => ({
  checkAuthStatus: () => dispatch(checkAuthStatus())
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
