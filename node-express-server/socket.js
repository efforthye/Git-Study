const socket = require("socket.io");
// import socket from 'socket.io';

module.exports = (server) => {
    console.log(server);
    const io = socket(server);
};
// export default server = (server) =>{
//     console.log(server);
//     const io = socket(server);
// }