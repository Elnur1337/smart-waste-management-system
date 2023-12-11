//Libraries
require('dotenv/config');
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
});

//Routers
const trashBinsRouter = require('./routes/getTrashBins');



//Routes
app.use('/getTrashBins', trashBinsRouter);

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT}!`);
});