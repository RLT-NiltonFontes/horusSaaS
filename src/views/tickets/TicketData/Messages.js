import React, {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Tabs, Tab, Typography, Container, Grid, Box, makeStyles, Card, CardHeader, Divider, CardContent, Button, TextField, FormLabel, Input, OutlinedInput} from '@material-ui/core/';
import axios from 'axios';
import api from 'src/redux/actions/api';
import {getTicketComments} from 'src/redux/actions/tickets';

const mockupData = [
    {
        userID: 'ohter',
        message: '',
    },
    
    {
        userID: 'other',
        message: '',
    },
]

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
    },
    myMessanger: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: '10px',
    },
    my: { 
        background: theme.palette.primary.light,
        marginLeft: '15%'
    },
    other: {
        background: 'lightgray',
    },
    message: {
        display: 'block',
        color: 'white',
        clear: 'both',
        lineHeight: '18px',
        fontSize: '15px',
        padding: '8px',
        position: 'relative',
        maxWidth: '85%',
        wordWrap: 'break-word',
        textDecoration: 'none',
        borderRadius: '5px'
    },
    messagesContainer: {
        height: '500px',
        position: 'relative',
        overflowY: 'scroll'
    },
    datePosition: {
        textAlign: 'right'
    }
}));

const Messages = (props) => {
    const lng = props.lng ?? {};
    const classes = useStyles();
    const params = useParams();
    const myRef = useRef(null);

    const [messages, setMessages] = useState( props.messages );
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        props.getTicketComments(params.id)
    }, [])
    useEffect(() => {
        setMessages(props.messages)
    }, [props])

    useEffect(() => {
        if(myRef.current) myRef.current.scrollIntoView()
    })
    const handleChange = (e) => {
        setNewMessage(e.target.value)
    }

    /* const handleAddComment = (e) => {
        const newMessages = [...messages];
        newMessages.push({
            userID: '21312',
            commentText: newMessage
        });
        setNewMessage('')
        setMessages(newMessages)
        
    } */ 
    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('commentText', newMessage)
        formData.append('tableID', '3');
        formData.append('clientAccess', '1');
        formData.append('objectID', params.id);

        axios.post(api.createComment, formData).then(
            response => {
                if(response.status === 200){
                    props.getTicketComments(params.id)
                    setNewMessage('')
                }
            }
        ).catch( err => console.log(err))
    }

    
    return (
        <>
        <div className={classes.messagesContainer}>
            {messages.map(
                (m, index) => {
                    const whosMessage = m.userID === props.user.userID ? classes.my : classes.other
                    const whosMessanger = m.userID ===  props.user.userID ? classes.myMessanger : classes.otherMessanger;

                    if(index === messages.length - 1 ) {
                        return (
                            <div style={{marginBottom: '10px'}}  ref={myRef}>
                                <FormLabel className={whosMessanger}>{m.userFullName}</FormLabel>
                                <TextField 
                                    fullWidth
                                    className={`${classes.message} ${whosMessage}`}
                                    value={m.commentText}
                                    multiline
                                    InputProps={{ disableUnderline: true, readOnly: true }}
                                    helperText={m.createdDate}
                                />
                            </div>
                        )
                    }
                    return (
                        <div style={{marginBottom: '10px'}}>
                            <FormLabel className={whosMessanger}>{m.userFullName}</FormLabel>
                            <TextField 
                                fullWidth
                                className={`${classes.message} ${whosMessage}`}
                                value={m.commentText}
                                multiline
                                InputProps={{ disableUnderline: true, readOnly: true }}
                                FormHelperTextProps={{
                                    className: classes.datePosition
                                }}
                                helperText={m.createdDate}
                            />

                        </div>
                    )
                }
            )}
        </div>
            <Divider />
            <form onSubmit={ (e) =>{
                e.preventDefault();
                //handleAddComment()
                handleSubmit()
            }}>
                <OutlinedInput 
                    fullWidth
                    placeholder={lng.inputPlaceholder}
                    value={newMessage}
                    onChange={handleChange}
                    endAdornment={
                        <Button variant="contained" color="primary" type="submit">{lng.inputSentButton}</Button>
                    }
                />
            </form>
        </>
    )
}

Messages.propTypes = {
    messages: PropTypes.array
};

const mapStateToProps = state => ({
    messages: state.tickets.ticketData?.comments ?? [],
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    getTicketComments: (ticketID) => dispatch(getTicketComments(ticketID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)