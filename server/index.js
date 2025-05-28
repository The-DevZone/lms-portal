// Import express module
import express from 'express';
import dotenv from "dotenv"
import dbConnect from './database/db.js';
import userRoute from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app = express();

dotenv.config({});
const PORT = process.env.PORT || 3000;
dbConnect();


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})),

//default api 
app.use(express.json());
app.use(cookieParser());
//api
app.use("/api/v1/user", userRoute);

app.listen(PORT , () => { //  Start the server and listen on the specified port
    console.log(`Server is running on port ${PORT}`);
})

app.get("/home", (_, res) =>{
    res.status(200).json({
        success: true,
        message: "hello from backed ",
    })
})
