import React from 'react';
import {connect} from 'react-redux';
import App from './App';
import {checkAuthStatus} from 'src/redux/actions/auth'



class Wrapper extends React.Component{
    componentDidMount(){
        console.log('hereeeee   ')
        if(window.location.pathname === '/login'){
          
        }
        else{
          if(!localStorage.getItem('AUTH-TOKEN')){
            //window.location.pathname = '/login'
          }else{
              this.props.checkAuthStatus()
          }
        }
{}
    }
    render(){
      return(
        <React.Fragment>
            <App />
        </React.Fragment>
      )
    }
  }
const mapStateToProps = state => ({
    auth: state.auth
  })
const mapDispatchToProps = dispatch => ({
    checkAuthStatus: () => dispatch(checkAuthStatus())
  })
export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);