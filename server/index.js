//Libraries
require('dotenv/config');
const cors = require('cors');
const express = require('express');
const app = express();

//Routers


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

//Routes
//app.use('/register', registerRouter);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT}!`);
});