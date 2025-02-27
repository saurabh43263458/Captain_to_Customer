const express  = require('express');
const app =express();
const dotenv  = require('dotenv');
dotenv.config();
const cors = require('cors');
const cookieParser =require('cookie-parser')
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes');
connectToDb();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res) => {
  res.send("hello world");
})
app.use('/captains',captainRoutes);
app.use('/user',userRoutes);
module.exports = app;