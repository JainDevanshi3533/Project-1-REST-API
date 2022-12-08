const express = require('express');
const app = express();
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser:true})
// const db = mongoose.connection;
// db.on('error',(error)=>{
//     console.log(error);
// })
// db.once('open',()=>console.log('Connected to database'));

mongoose.connect('mongodb://localhost/devanshi_db1', {useNewUrlParser:true}).then(res=>{
    console.log('connected');
}).catch(err=>{
    console.log(err);
})

app.use(express.json());

const usersRouter = require('./routes/users.js');
app.use('/users',usersRouter)

app.listen(80,()=>{
    console.log('server started');
})