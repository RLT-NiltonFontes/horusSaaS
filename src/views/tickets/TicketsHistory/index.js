import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {
  Box,
  Container,
  Grid,
  TextField,
  Card,
  CardHeader,
  Divider,
  makeStyles,
  IconButton,
  CardContent,
  CircularProgress
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/ClearAll';
import { Formik } from 'formik';
import Page from 'src/components/Page';
import {Link} from 'react-router-dom'
import DataTable from 'mui-datatables';
import {getTicketsHistory, returnTicketsList} from 'src/redux/actions/tickets';
import strings from 'src/languages/tickets'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const OpenTickets = (props) => {
    const lng = strings[props.language];
    useEffect( () => {
      props.returnTicketsList([])
    }, [])


    const columns = [
      {
        name: "title",
        label: lng.title,
        options: {
          filter: true,
          sort: true,
          customBodyRenderLite: (dataIndex, rowIndex) => {
            let val = props.ticketsList[dataIndex]?.title ?? null;
            let id = props.ticketsList[dataIndex]?.ticketID ?? null;

            
            return <Link to={`/app/tickets/${id}`}>{val}</Link>;
          }
        }
      }, 
      {
        name: "clientTicket",
        label: lng.clientTicket,
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "rlString",
        label: lng.rlString,
        options: {
          filter: true,
          sort: true,
        }
      }, 
      {
        name: "priority",
        label: lng.priority,
        options: {
          filter: true,
          sort: true,
        }
      },    
      {
        name: "owner",
        label: lng.owner,
        options: {
          filter: true,
          sort: true,
          customBodyRenderLite: (dataIndex) => {
            let val = props.ticketsList[dataIndex].owner ?? '-';
            return val;
          }
        }
      }, 
      {
        name: "assets",
        label: lng.assets,
        options: {
            filter: false,
            sort: false,
            customBodyRenderLite: (dataIndex) => {
                let val = props.ticketsList[dataIndex].owner ?? '-';
                return val;
            }
        }
      },
      {
        name: "lastUpdateDate",
        label: lng.lastUpdateDate,
        options: {
          filter: true,
          sort: true,
        }
      }, 
    ]
    const classes = useStyles();
    const data = props.ticketsList?.map( t => ([t.title, t.clientTicket, t.rlString, t.priority, t.supportOwnerFullName, t.lastUpdateDate,])) ?? []
    return (
        <Page
        className={classes.root}
        title={lng.pageTitleHistory}
        >   
            <Container maxWidth={false}>
            <Card>
              <CardHeader
              title={lng.pageTitleHistory} />
              <Divider/>
              <CardContent>
                <Box>
                    <Formik
                        initialValues={{
                            title: '',
                            clientExtraNotes: '',
                            clientTicket: '',
                            assets: '',
                            description: '',
                            rootCause: '',
                            resolution: '   '
                        }}
                        onSubmit={ async (values, {setSubmitting}) => {
                          const valuesToReturn = {}
                          for(let key in values){
                            if( values[key].trim().length > 0) valuesToReturn[key] = values[key]
                          }
                          
                          await props.getTicketsHistory(valuesToReturn).then(
                            res => console.log(res)
                          );
                          setSubmitting(false)
                        } }
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            resetForm,
                            isSubmitting,
                            touched,
                            values
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item md={3} xs={12}>
                                        <TextField
                                            error={Boolean(touched.title && errors.title)}
                                            helperText={touched.title && errors.title}
                                            fullWidth
                                            onBlur={handleBlur}
                                            label={lng.title}
                                            name="title"
                                            onChange={handleChange}
                                            value={values.title}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={12}>
                                      <TextField
                                          error={Boolean(touched.clientExtraNotes && errors.clientExtraNotes)}
                                          helperText={touched.clientExtraNotes && errors.clientExtraNotes}
                                          fullWidth
                                          onBlur={handleBlur}
                                          label={lng.clientExtraNotes}
                                          name="clientExtraNotes"
                                          onChange={handleChange}
                                          value={values.clientExtraNotes}
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
                                          value={values.clientTicket}
                                          variant="outlined"
                                      />
                                    </Grid>
                                    <Grid item md={3} xs={12}>
                                      <TextField
                                          error={Boolean(touched.assets && errors.assets)}
                                          helperText={touched.assets && errors.assets}
                                          fullWidth
                                          onBlur={handleBlur}
                                          label={lng.assets}
                                          name="assets"
                                          onChange={handleChange}
                                          value={values.assets}
                                          variant="outlined"
                                      />
                                    </Grid>
                                    
                                    <Grid item md={3} xs={12}>
                                      <TextField
                                          error={Boolean(touched.description && errors.description)}
                                          helperText={touched.description && errors.description}
                                          fullWidth
                                          onBlur={handleBlur}
                                          label={lng.description}
                                          name="description"
                                          onChange={handleChange}
                                          value={values.description}
                                          variant="outlined"
                                      />
                                    </Grid>
                                    
                                    <Grid item md={3} xs={12}>
                                      <TextField
                                          error={Boolean(touched.rootCause && errors.rootCause)}
                                          helperText={touched.rootCause && errors.rootCause}
                                          fullWidth
                                          onBlur={handleBlur}
                                          label={lng.rootCause}
                                          name="rootCause"
                                          onChange={handleChange}
                                          value={values.rootCause}
                                          variant="outlined"
                                      />
                                    </Grid>
                                    
                                    <Grid item md={3} xs={12}>
                                      <TextField
                                          error={Boolean(touched.resolution && errors.resolution)}
                                          helperText={touched.resolution && errors.resolution}
                                          fullWidth
                                          onBlur={handleBlur}
                                          label={lng.resolution}
                                          name="resolution"
                                          onChange={handleChange}
                                          value={values.resolution}
                                          variant="outlined"
                                      />
                                    </Grid>
                                    
                                    <Grid item md={3} xs={12}>
                                      <IconButton type="submit"> {isSubmitting ? <CircularProgress size={20} /> : <SearchIcon />} </IconButton>
                                      <IconButton onClick={resetForm}> <ClearIcon /> </IconButton>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </Box>
                  <Divider style={{margin: '1rem 0'}} />
                <Container maxWidth>
                  <DataTable 
                      options={{
                          setTableProps: () => ({
                              size: 'small'
                          }),
                          sortOrder:{name:'title', direction: 'desc'},
                          responsive: 'vertical',
                          selectableRows: "none"
                      }}
                      columns={columns}
                      data={data}
                      title="Open Tickets"
                      />
                </Container>
                </CardContent>
              </Card>
            </Container>
        </Page>
    );
};

const mapStateToProps = state => ({
  ticketsList: state.tickets.ticketsList,
  language: state.settings.language,
})

const mapDispatchToProps = dispatch => ({
  getTicketsHistory: (data) => dispatch(getTicketsHistory(data)),
  returnTicketsList: () => dispatch(returnTicketsList()),
})
export default connect(mapStateToProps, mapDispatchToProps)(OpenTickets);
