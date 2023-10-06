const express = require('express');
const req = require('express/lib/request');
const path = require('path');
require('dotenv').config();
//App Express
const app = express();
//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Public path
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

server.listen(process.env.PORT, (e) => {
    if (e) throw new Error(e);

    console.log('Server is running on port!!', process.env.PORT);
});