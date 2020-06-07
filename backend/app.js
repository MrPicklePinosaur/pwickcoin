const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config');


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port=3000;
const userRoutes = require('./routes/users.js');
const chatRoutes = require('./routes/chats.js');
const loginRoute = require('./routes/login.js');
const registerRoute = require('./routes/register.js');

// app.use('/users',userRoutes);
// app.use('/chats',chatRoutes);
app.use('/login',loginRoute);



mongoose.connect(process.env.DB_CONNECTION,    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("connected to db");
    },
);
app.listen(port);
