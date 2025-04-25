require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const db = require('./db/connect');
const cors = require('cors')
const cookieParser = require('cookie-parser');

const app = express();
const httpServer = createServer(app);
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());    // json 형식 폼 요청 들어오면 파싱

db();

const io = new Server(httpServer, {
    cors: corsOptions
})

require("./utils/io")(io);


app.get('/', (req, res) => {
    res.send({ message: 'hello' });
});

const authRoute = require('./routes/auth');
app.use('/auth', authRoute);



httpServer.listen(process.env.PORT || 5001, () => {
    console.log('server listening on port', process.env.PORT);
})