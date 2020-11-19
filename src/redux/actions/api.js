const prod = '';
const dev = '-dev'

const ambiente = dev;
export default {
    login: `https://users-dot-horus-rlt${ambiente}.appspot.com/api/users/v2/login`,
    userCreate: `https://users-dot-horus-rlt${ambiente}.appspot.com/api/users/v2/create`,
    openticket: `https://ticket-dot-horus-rlt${ambiente}.appspot.com/api/ticket/v1/create`
}