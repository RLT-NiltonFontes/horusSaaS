import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab, Typography, Container, Grid, Box, makeStyles, Card, CardHeader, Divider, CardContent, Button, TextField} from '@material-ui/core/';

const general = (props) => {
    const ticket = props.ticket ?? {};
    const lng = props.lng ?? {}
    return (
        <Container maxWidth={false}>
            <Grid container spacing={3}>
                <Grid item md={3} xs={12}>
                    <TextField
                        fullWidth
                        label={'contact name'}
                        value={ticket.contactName || '-'}
                        inputProps={{
                            readOnly: true
                        }}
                    />
                </Grid>
                <Grid item md={3} xs={12}>
                    <TextField
                        fullWidth
                        label={'contact phone'}
                        value={ticket.contactPhone || '-'}
                        inputProps={{
                            readOnly: true
                        }}
                    />
                </Grid>
                <Grid item md={3} xs={12}>
                    <TextField
                        fullWidth
                        label={'contact mail'}
                        value={ticket.contactMail || '-'}
                        inputProps={{
                            readOnly: true
                        }}
                    />
                </Grid>
                <Grid item md={3} xs={12}>
                    <Button color="primary" variant="contained" > {lng.editButton} </Button>
                </Grid>
                <Grid item md={12} xs={12}>
                    <TextField
                        fullWidth
                        label={lng.address}
                        value={ticket.address || '-'}
                        inputProps={{
                            readOnly: true
                        }}
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <TextField
                        fullWidth
                        label={lng.assets}
                        value={ticket.assets || '-'}
                        multiline
                        rows={2}
                        inputProps={{
                            readOnly: true
                        }}
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <TextField
                        fullWidth
                        label={lng.description}
                        value={ticket.description || '-'}
                        multiline
                        rows={5}
                        inputProps={{
                            readOnly: true
                        }}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        label={lng.rootCause}
                        value={ticket.rootCause || '-'}
                        multiline
                        rows={3}
                        inputProps={{
                            readOnly: true
                        }}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        label={lng.resolution}
                        value={ticket.resolution || '-'}
                        multiline
                        rows={3}
                        inputProps={{
                            readOnly: true
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

general.propTypes = {
    ticket: PropTypes.object.isRequired,
    lng: PropTypes.object.isRequired,
  };

export default general;