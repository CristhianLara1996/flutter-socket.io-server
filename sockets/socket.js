const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

console.log('init server');

bands.addBand(new Band('Metal'));
bands.addBand(new Band('Rock'));
bands.addBand(new Band('Heroes'));
bands.addBand(new Band('Salsa'));
bands.addBand(new Band('Merengue'));

console.log(bands);
//Message sockets
io.on('connection', client => {
    console.log('Client connected');

    client.emit('active-bands', bands.getBands());
    // client.on('event', data => { /* … */ });
    client.on('disconnect', () => { console.log('Client Desconnected') });
    client.on('message', (payload) => {
        console.log('Hi Bro!!', payload);
        io.emit('message', { admin: 'New message as admin' });
    });

    client.on('emit-message', (payload) => {
        console.log(payload,);
        io.emit('new-message', payload);
    });
    //Crud bands
    client.on('vote-band', (payload) => {
        console.log(payload,);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
        // io.emit('new-message', payload);
    });
    client.on('create-band', (payload) => {
        console.log(payload,);
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
        // io.emit('new-message', payload);
    });
    client.on('delete-band', (payload) => {
        console.log(payload,);
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
        // io.emit('new-message', payload);
    });
});