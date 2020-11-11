import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Routes, Route } from 'react-router-dom';

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
            <Route path="/" element={<h1>Home Tickets</h1>} />
            <Route path=":id" element={<h1>ID Tickets</h1>} />
            <Route path="me" element={<h1>ME Tickets</h1>} />
        </Routes>
    );
};

export default Tickets;
