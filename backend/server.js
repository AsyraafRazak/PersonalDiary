const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

// CORS Configuration
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/diaries', require('./routes/diaryRoutes'));

// Provide a fallback port in case process.env.PORT is not defined
const PORT = process.env.PORT || 5000; 

// Log the MONGODB_URI to ensure it's being loaded (for debugging)
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Loaded' : 'Undefined');

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});