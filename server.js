const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Root
app.get('/', (req, res) => {
    res.send('Major Professional Sports Teams Forum API is running...');
});

// Database Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/sports_forum';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] Server running on port ${PORT}`);
    console.log(`[PATH] Running from: ${__dirname}`);
});