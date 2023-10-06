const { io } = require('../index');
//Message sockets
io.on('connection', client => {
    console.log('Client connected');
    // client.on('event', data => { /* … */ });
    client.on('disconnect', () => { console.log('Client Desconnected') });
    client.on('message', (payload) => {
        console.log('Hi Bro!!', payload);
        io.emit('message', { admin: 'New message as admin' });
    });
});