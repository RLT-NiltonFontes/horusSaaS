import 'react-perfect-scrollbar/dist/css/styles.css';
import React, {useEffect} from 'react';
import { useRoutes, useNavigate, useHistory} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

import thunk from 'redux-thunk'
import { connect, Provider } from 'react-redux';
import {checkAuthStatus} from 'src/redux/actions/auth'

import reducer from './redux/reducers';
import { createStore, applyMiddleware, compose } from 'redux';

/* const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)) ); */
let lastPath = ''
//window.location.pathname !== '/login' && 
const App = (props) => {
  const routing = useRoutes(routes);
  const navigate = useNavigate();
  useEffect( () => {
    console.log('useEffect')
    if(!localStorage.getItem('AUTH-TOKEN')){
      navigate('/login')
    }else{
      const res = props.checkAuthStatus()
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
