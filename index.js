const express = require('express');
const mongoose = require('mongoose');
const mentorRoutes = require('./routes/mentorroutes');
const studentRoutes = require('./routes/studentroutes');

const app = express();
const port = 3002;



const url = 'mongodb+srv://ajaysnaviee:2xMYRIUEm7XjEjm9@cluster0.jvsps7g.mongodb.net/StudentMentor?retryWrites=true&w=majority';

mongoose.connect(url);

const db = mongoose.connection;
db.once('open', () => {
  console.log('Database connected');
});
db.on('error', console.error.bind(console, 'Connection error'));


app.use(express.json());
app.use('/', mentorRoutes); // Use mentor routes
app.use('/', studentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
