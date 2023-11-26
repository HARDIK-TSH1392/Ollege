const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
require('dotenv').config();

connectToMongo();
const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/courses', require('./routes/courses'))
app.use('/api/reviews', require('./routes/reviews'))

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});