import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import DataTable from 'mui-datatables';
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

const OpenTickets = () => {
    const columns = ['Ticket Title', 'Client']
    const classes = useStyles();
    const data = [
        ['ticket1',
        'Client 1',]
    ]
    return (
        <Page
        className={classes.root}
        title="Products"
        >   
            <Container maxWidth={false}>
                <DataTable 
                    options={{
                        setTableProps: () => ({
                            size: 'small'
                        })
                    }}
                    columns={columns}
                    data={data}
                    title="Open Tickets"/>
            </Container>
        </Page>
    );
};

export default OpenTickets;
