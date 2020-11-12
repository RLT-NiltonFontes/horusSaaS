import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Routes, Route } from 'react-router-dom';

import CurrentTickets from './CurrentTickets';
import OpenTicket from './OpenTicket'

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
            <Route path="/history" element={<h1>history Tickets</h1>} />
            <Route path="/:id" element={<h1>ID Tickets</h1>} />
        </Routes>
    );
};

export default Tickets;
