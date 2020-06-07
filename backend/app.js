const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/users.js');
const chatRoutes = require('./routes/chats.js');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port=3000;

app.use('/users',userRoutes);
app.get('/chats',chatRoutes);


mongoose.connect(process.env.DB_CONNECTION,    { useNewUrlParser: true },
    () => {
        console.log("connected to db");
    },
);
app.listen(port);
