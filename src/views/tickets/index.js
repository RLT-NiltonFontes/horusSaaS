import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Routes, Route } from 'react-router-dom';

import CurrentTickets from './CurrentTickets';
import OpenTicket from './OpenTicket';
import TicketData from './TicketData/TicketData';
import TicketsHistory from './TicketsHistory';

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

const Tickets = () => {
    return (
        <Routes>
            <Route path="/open" element={<OpenTicket />} />
            <Route path="/current" element={<CurrentTickets />} />
            <Route path="/history" element={<TicketsHistory />} />
            <Route path="/:id" element={<TicketData />
          } />
        </Routes>
    );
};

export default Tickets;
