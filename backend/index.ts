const express = require('express');
const routes = require('./routes')
const cors = require('cors');
const cookieParser = require('cookie-parser');


const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors());

// Возможно нужно бдует сделать forEach
app.use('/api', routes);

app.listen(PORT, () => console.log('READY TO WORK'))