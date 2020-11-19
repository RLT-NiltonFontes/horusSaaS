import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import RealLifeLogo from 'src/assets/images/interiores/logo_rlt_footer.png'

const items = [
  {
    href: '/app/tickets/open',
    icon: AlertCircleIcon,
    title: 'Open Tickets'
  },
  {
    href: '/app/tickets/current',
    icon: AlertCircleIcon,
    title: 'Current Tickets'
  },
  {
    href: '/app/tickets/history',
    icon: AlertCircleIcon,
    title: 'Tickets History'
  },
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/login',
    icon: LockIcon,
    title: 'Login'
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    background: 'lightgrey',
    width: 256
  },
  desktopDrawer: {
    background: 'lightgrey',
    width: 256,
    //top: 64,
    //height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile, user }) => {
  console.log(user)
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        {/* <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        /> */}
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.userFirstName || '-'+' '+user.userLastName || ''}
        </Typography>
        {/* <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography> */}
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
      <Box
        p={2}
        m={2}
      >
        <img src={`${RealLifeLogo}`} width="100%" />
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

const mapStateToProps = state => ({
  user: state.auth.user || {}
})

export default connect(mapStateToProps)(NavBar);
