const { createServer } = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const path = require('path');
require('dotenv').config();

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000/",
    }
})

require("./utils/io")(io);

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'front', 'public', 'index.html'));
    res.send({message: 'hello'});
})

httpServer.listen(process.env.PORT || 5001, () => {
    console.log('server listening on port', process.env.PORT);
})