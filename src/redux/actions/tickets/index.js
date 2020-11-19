import axios from 'axios';
import api from 'src/redux/actions/api';

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
                let status = response.status;
            }
        ).catch(
            err => {
                status = err.response?.status
            }
        )
        return status
    } 
}