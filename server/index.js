// Import express module
import express from 'express';
import dotenv from "dotenv"
import dbConnect from './database/db.js';
import usersRouter from './routes/user.route.js';
const app = express();

const PORT = process.env.PORT || 3000;
dotenv.config({});
dbConnect();

app.use("api/v1/users", usersRouter);

app.get('/Home', (_, res) => {
    res.status(200).json({
        success: true,
        message: "hellow I am comming from backend"
    })
})


app.get('/', (req, res) => {
    res.send('Hello World');
})
app.listen(PORT, () => { //  Start the server and listen on the specified port
    console.log(`Server is running on port ${PORT}`);
})
