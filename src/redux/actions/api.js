const prod = '';
const dev = '-dev'

const ambiente = dev;
export default {
    login: `https://users-dot-horus-rlt${ambiente}.appspot.com/api/users/v2/login`,
    forgotPassword: `https://users-dot-horus-rlt${ambiente}.appspot.com/api/users/v2/forgotPassword`,
    userCreate: `https://users-dot-horus-rlt${ambiente}.appspot.com/api/users/v2/create`,
    openticket: `https://ticket-dot-horus-rlt${ambiente}.appspot.com/api/ticket/v1/create`,
    clientViewTickets: `https://ticket-dot-horus-rlt${ambiente}.appspot.com/api/ticket/v1/clientView`,
    ticketsHistory: `https://ticket-dot-horus-rlt${ambiente}.appspot.com/api/ticket/v1/searchHistory`,
    getTicket: `https://crud-dot-horus-rlt${ambiente}.appspot.com/api/TicketFullView/v1/read`,
    getComments: `https://crud-dot-horus-rlt${ambiente}.appspot.com/api/CommentFullView/v1/read`,
    createComment: `https://comment-dot-horus-rlt${ambiente}.appspot.com/api/comment/v1/create`,
    getFiles: `https://crud-dot-horus-rlt${ambiente}.appspot.com/api/FileFullView/v1/read`,
    addFile: `https://file-dot-horus-rlt${ambiente}.appspot.com/api/file/v1/upload`,
    actionReopenTicket: `https://ticket-dot-horus-rlt${ambiente}.appspot.com/api/ticket/v1/action/Reopen/`,
    actionValidateTicket: `https://ticket-dot-horus-rlt${ambiente}.appspot.com/api/ticket/v1/action/Validate/`,
    actionResolveTicket: `https://ticket-dot-horus-rlt${ambiente}.appspot.com/api/ticket/v1/action/ClientSolved/`,
}