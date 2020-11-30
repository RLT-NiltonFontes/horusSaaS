import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import {Link} from 'react-router-dom'
import DataTable from 'mui-datatables';
import {getClientViewTickets} from 'src/redux/actions/tickets';
import strings from 'src/languages/tickets';

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
    const lng = strings['pt']

    useEffect(() => {
      props.getClientViewTickets();
    }, [])


    const columns = [
      {
        name: "title",
        label: "Ticket",
        options: {
          filter: true,
          sort: true,
          sortThirdClickReset: true,
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
        name: "stateNome",
        label: lng.state,
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
        name: "pending",
        label: lng.pending,
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value) => {
            return value === 0 ? 'Client' : 'Real Life'
          }
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
        name: "lastUpdateDate",
        label: lng.lastUpdateDate,
        options: {
          filter: true,
          sort: true,
        }
      }, 
    ]
    const classes = useStyles();
    const data = props.ticketsList?.map( t => ([t.title, t.clientTicket, t.ticketStateNome, t.rlString, t.priority, t.ourSide, t.supportOwnerFullName, t.lastUpdateDate,])) ?? []
    return (
        <Page
        className={classes.root}
        >   
            <Container maxWidth={false}>
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
                    title={lng.pageTitleCurrentTickets}/>
            </Container>
        </Page>
    );
};

const mapStateToProps = state => ({
  ticketsList: state.tickets.ticketsList,
})

const mapDispatchToProps = dispatch => ({
  getClientViewTickets: () => dispatch(getClientViewTickets())
})
export default connect(mapStateToProps, mapDispatchToProps)(OpenTickets);
