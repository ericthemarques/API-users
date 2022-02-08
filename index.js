require('dotenv').config() 

const express = require('express');
const app = express();
const mongoose = require('mongoose');

// 
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))
// -------------------------------------------------------------------------

// letting my app to runs JSON
app.use(express.json())
// -------------------------------------------------------------------------

// ROUTES
const usersRoutes = require('./routes/users')
app.use('/users', usersRoutes)

app.listen(4000, () => console.log("App running in port 4000..."))