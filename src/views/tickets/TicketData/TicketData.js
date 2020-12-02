import React from 'react';
import {connect} from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Tabs, Tab, Typography, Container, Grid, Box, makeStyles, Card, CardHeader, Divider, CardContent, Button, TextField, CircularProgress,} from '@material-ui/core/';

import General from './General';
import Messages from './Messages';
import Files from './Files';

import Resolved from './Dialogs/Resolved';
import Reopen from './Dialogs/Reopen';
import Validate from './Dialogs/Validate';

import {getTicketData} from 'src/redux/actions/tickets';
import strings from 'src/languages/tickets'

const REOPEN = 'REOPEN';
const VALIDATE = 'VALIDATE';
const RESOLVED = 'RESOLVED';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabPanel: {
    width: '100%',
  }
}));

const setActions = (ticket, setDialog) => {
  //const ticket =  {ticketStateID:5};
  const actions = []
  switch(ticket.ticketStateID){
    case 5:
      actions.push(
        <Button className="actionButton" variant="contained" color="primary" onClick={() => setDialog(REOPEN)}> Reopen </Button>,
        <Button className="actionButton" variant="contained" color="secondary" onClick={() => setDialog(VALIDATE)}> Validate </Button>
        )
      break;
    default:
      if(ticket.ticketStateID != 4){
        actions.push(<Button className="actionButton" variant="contained" color="primary" onClick={() => setDialog(RESOLVED)}> Resolvido </Button>)
      }
      break;
  }

  return actions;

}

const TicketData = (props) => {
  const ticket = props.ticket ?? {};
  const lng = strings[props.language];
  const classes = useStyles();
  const params = useParams();
  const [value, setValue] = React.useState(2);
  const [loading, setLoading] = React.useState(false);

  React.useEffect( () => {
    setLoading(true);
    props.getTicketData(params.id).then().catch().finally(() => setLoading(false))
  },[])

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [dialog, setDialog] = React.useState(null);
  const handleCloseDialog = () => {
    setDialog(null)
  } 

  const tabs = [
    {
      tabLabel: lng.general,
      component: <General ticket={ticket} lng={lng}/>,
    },
    {
      tabLabel: lng.messages,
      component: <Messages 
        lng={lng}
      />,
    },
    {
      tabLabel: lng.files,
      component: <Files 
        lng={lng}
      />,
    },
  ]

  const ticketTitle = `${ticket.title ?? 'Ticket'} / ${ticket.clientTicket ?? 'not Found'} - ${ticket.ticketStateNome ?? ''}`;

  const actions = setActions(ticket, setDialog)

  return (
    <Container maxWidth={false}>
      <Resolved open={Boolean(dialog === RESOLVED)} handleClose={() => handleCloseDialog()} handleConfirm={() => handleCloseDialog()} lng={lng}/>
      <Reopen open={Boolean(dialog === REOPEN)} handleClose={() => handleCloseDialog()} handleConfirm={() => handleCloseDialog()} lng={lng}/>
      <Validate open={Boolean(dialog === VALIDATE)} handleClose={() => handleCloseDialog()} handleConfirm={() => handleCloseDialog()} lng={lng}/>
        <Card>
            <CardHeader
            title={ticketTitle}
            action={loading ? <CircularProgress /> : actions}/>
            <Divider/>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField 
                    fullWidth
                    label={lng.clientExtraNotes}
                    value={ticket.clientExtraNotes || '-'}
                    inputProps={{
                      readOnly: true
                    }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField 
                    fullWidth
                    label={lng.priority}
                    value={ticket.priority || '-'}
                    inputProps={{
                      readOnly: true
                    }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField 
                    fullWidth
                    label={lng.rlString}
                    value={ticket.rlString || '-'}
                    inputProps={{
                      readOnly: true
                    }}
                  />
                </Grid>
                
                <Grid item md={3} xs={12}>
                  <TextField 
                    fullWidth
                    label={lng.creationDate}
                    value={ticket.createDate || '-'}
                    inputProps={{
                      readOnly: true
                    }}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <div className={classes.root}>
                      <Tabs
                          orientation="vertical"
                          centered
                          value={value}
                          onChange={handleChange}
                          aria-label="Vertical tabs example"
                          className={classes.tabs}
                      >
                          {tabs.map(
                            (tab, index) => <Tab label={tab.tabLabel} {...a11yProps(index)}/>
                          )}
                      </Tabs>
                      
                      <TabPanel value={value} index={value} className={classes.tabPanel}>
                          {
                            tabs[value].component
                          }
                      </TabPanel>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
        </Card>
        
    </Container>
  );
}

const mapStateToProps = state => ({
  ticket: state.tickets.ticketData || {},
  language: state.settings.language,
})

const mapDispatchToProps = dispatch => ({
  getTicketData: (ticketID) => dispatch(getTicketData(ticketID))
})

export default connect(mapStateToProps,mapDispatchToProps)(TicketData)