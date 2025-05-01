// Import express module
import express from 'express';
import dotenv from "dotenv"
import dbConnect from './database/db.js';

const app = express();
dotenv.config({});
dbConnect();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello World');
})
app.listen(PORT, () => { //  Start the server and listen on the specified port
    console.log(`Server is running on port ${PORT}`);
})
