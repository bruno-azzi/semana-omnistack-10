const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://azzi:123@cluster0-dl2de.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(cors());
app.use(express.json()); // tem q vir antes do app.use(routes);
app.use(routes);

app.listen(3333); 