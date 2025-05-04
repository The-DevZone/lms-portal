// Import express module
import express from 'express';
import dotenv from "dotenv"
import dbConnect from './database/db.js';
import usersRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app = express();

const PORT = process.env.PORT || 3000;
dotenv.config({});
dbConnect();

//default api 
app.use(express.json());
app.use(cookieParser());
//api
app.use("/api/v1/users", usersRouter);
// app.post('/api/v1/users/register', (req, res) => {
//     console.log(req.body);
//     res.send('Hello World');
// })

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
// localhost:3000/api/v1/users/register
// localhost:3000/api/v1/users/login

app.get('/Home', (_, res) => {
    res.status(200).json({
        success: true,
        message: "hellow I am comming from backend"
    })
})


// app.get('/', (req, res) => {
//     res.send('Hello World');
// })
app.listen(PORT, () => { //  Start the server and listen on the specified port
    console.log(`Server is running on port ${PORT}`);
})
