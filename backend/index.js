const express = require('express');
const app = express();
const bodyparser=require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const EventRouter = require('./Routes/eventRouter'); 
require('dotenv').config();
require('./Models/db');

const PORT= process.env.PORT || 8080;

app.use(bodyparser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE', 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
}));
app.use('/auth', AuthRouter)
app.use('/events', EventRouter);

app.listen(PORT,()=>{
    console.log(`Server is ruuning on ${PORT}`)
})