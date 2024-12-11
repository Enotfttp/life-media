const express = require('express');
const routes = require('./routes/index')
const cors = require('cors');
const cookieParser = require('cookie-parser');

const corsOptions = {
    origin: ['http://localhost:3000'],
}

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors(corsOptions));

// Возможно нужно бдует сделать forEach
app.use('/api', routes.userRoutes);

app.listen(PORT, () => console.log('READY TO WORK'))