const express = require('express');
const routes = require('./routes/index')
const cors = require('cors');
const cookieParser = require('cookie-parser');

const corsOptions = {
    origin: ['http://localhost:3000'],
}

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(cors(corsOptions));

Object.keys(routes).forEach((key) => app.use('/api', routes[key]))

app.listen(PORT, () => console.log('READY TO WORK'))