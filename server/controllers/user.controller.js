import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: " Please fill all the fields"
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const hasedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hasedPassword,
    })
        return res.status(200).json({
            success: true,
            message: "User registered successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to register user",
        })
    }
}

export const login = async (req, res) => {
    console.log("login controller sonu");
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email "
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect  password"
            })
        }
        generateToken(res, user, `Welcome back ${user.name}`);
        // generateToken(res, user, `Welcome back ${user.name}`);
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}