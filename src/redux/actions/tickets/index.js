import axios from 'axios';
import api from 'src/redux/actions/api';
import * as types from 'src/redux/actions/tickets/types';

export const openTicket = (data) => {
    return async dispatch => {
        let status = null
        const formData = new FormData();
        for(let key in data){
            formData.append(key, data[key]);
        }
        formData.append('priority', 'P3');
        formData.append('slaID', '3');
        formData.append('ticketTypeID', '1');

        const response = axios.post(api.openticket, formData)
        await response.then(
            response => {
                status = response;
            }
        ).catch(
            err => {
                console.log(err.response)
                status = err.response
            }
        )
        return status
    } 
}

export const getClientViewTickets = () => {
    return dispatch => {
        axios.get(api.clientViewTickets).then(
            response => {
                dispatch(returnTicketsList(response.data))
            }
        ).catch(
            err => {
                console.log(err.response.data)
            }
        )
    }
}

export const getTicketsHistory = (data) => {
    const formData = new FormData();
    for(let key in data){
        formData.append(key, data[key])
    }

    return async dispatch => axios.post(api.ticketsHistory, formData).then(
        response => {
            dispatch(returnTicketsList(response.data))
            return response
        }
    ).catch(
        err => {
            console.log(err.response.data)
        }
    )
}


export const returnTicketsList = (list) => {
    return {
        type: types.UPDATE_LIST,
        payload: list
    }
}

export const getTicketData = (ticketID) => {
    return async dispatch => {
        const formData = new FormData();
        formData.append('ticketID', ticketID);
        return axios.post(api.getTicket, formData).then(
            response => {
                dispatch(returnTicket(response.data[0]));
                return response.status;
            }
        ).catch(
            err => console.log(err.response)
        )
    }
}
const returnTicket = (ticket) => {
    return {
        type: types.UPDATE_TICKET,
        payload: ticket
    }
}

export const getTicketComments = (ticketID) => {
    console.log('here')
    return dispatch => {
        const formData = new FormData();
        formData.append('tableID', '3');
        formData.append('clientAccess', '1');
        formData.append('objectID', ticketID);

        axios.post(api.getComments, formData).then(
            response => dispatch(returnComments(response.data))
        ).catch(
            err => console.log(err.response)
        )
    }
}
const returnComments = (commentsList) => {
    return {
        type: types.UPDATE_COMMENTS,
        payload: commentsList
    }
}


export const getTicketFiles = (ticketID) => {
    return dispatch => {
        const formData = new FormData();
        formData.append('tableID', '3');
        formData.append('clientAccess', '1');
        formData.append('objectID', ticketID);

        axios.post(api.getFiles, formData).then(
            response => dispatch(returnFiles(response.data))
        ).catch(
            err => console.log(err.response)
        )
    }
}

const returnFiles = (filesList) => {
    return {
        type: types.UPDATE_FILES,
        payload: filesList
    }
}

export const actionResolve = (data, ticketID) => {
    return async dispatch => {
        const formData = new FormData();
        formData.append('rootCause', data.rootCause)
        formData.append('resolution', data.resolution)
        return axios.post(`${api.actionResolveTicket}${ticketID}`, formData).then(
            response => {
                dispatch(getTicketData(ticketID))
                return response.status
            }
        ).catch(
            err => console.log(err)
        )
    }
}
export const actionValidate = (data, ticketID) => {
    return async dispatch => {
        const formData = new FormData();
        formData.append('rating1', data.rating1)
        formData.append('rating2', data.rating2)
        formData.append('rating3', data.rating3)
        formData.append('ratingComment', data.ratingComment)
        return axios.post(`${api.actionValidateTicket}${ticketID}`, formData).then(
            response => {
                dispatch(getTicketData(ticketID))
                return response.status;
            }
        ).catch(
            err => console.log(err)
        )
    }
}
export const actionReopen = (data, ticketID) => {
    return async dispatch => {
        const formData = new FormData();
        formData.append('reopenReason', data.reopenReason)
        return axios.post(`${api.actionReopenTicket}${ticketID}`, formData).then(
            response => {
                dispatch(getTicketData(ticketID))
                return response.status;
            }
        ).catch(
            err => console.log(err)
        )
    }
}

export const addFileToTicket = async (data, ticketID) => {
    const formData = new FormData();
    formData.append('uploadFile', data.file)
    formData.append('comment', data.comment)
    formData.append('tableID', '3')
    formData.append('clientAccess', '1')
    formData.append('objectID', ticketID)

    return await axios.post(api.addFile, formData).then(
        response => {
            getTicketFiles(ticketID);
        }
    ).catch(
        err => console.log(err)
    )
}