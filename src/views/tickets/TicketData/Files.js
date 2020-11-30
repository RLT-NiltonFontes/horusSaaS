import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
import MuiDatatable from 'mui-datatables';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddFile from './Dialogs/AddFile';


import {getTicketFiles} from 'src/redux/actions/tickets';

const Files = (props) => {
    const lng = props.lng ?? {};
    const columns = [
        {
            label: lng.fileName,
            name: 'name'
        },
        {
            label: lng.uploadedBy,
            name: 'uploadedBy'
        },
        {
            label: lng.uploadDate,
            name: 'uploadDate',
        },
        {
            label: lng.action,
            name: 'action',
            options: {
                sort: false,
                viewColumns: false
            }
        },
    ]
    const params = useParams();
    const [open, setDialog] = useState(false)
    
    useEffect(() => {
        props.getTicketFiles(params.id)
    },[])
    
    const handleClose = () => setDialog(false)

    return (
        <>
        <AddFile open={open} handleClose={handleClose} handleConfirm={handleClose} getTicketFiles={props.getTicketFiles} lng={lng}/>
        <MuiDatatable 
            columns={columns}
            options={{
                download: false,
                selectableRows: 'none',
                viewColumns: false,
                filter: false,
                print: false,
                customToolbar: () => {
                    return <IconButton onClick={() => setDialog(true)}> <AddIcon /> </IconButton>
                }
            }}
            data={props.files}
            title={lng.filesTableTitle}
        />
        </>
    )
}

const mapStateToProps = state => ({
    files: state.tickets.ticketData?.files ?? []
})

const mapDispactchToProps = dispatch => ({
    getTicketFiles: (ticketID) => dispatch(getTicketFiles(ticketID))
})

export default connect(mapStateToProps, mapDispactchToProps)(Files);