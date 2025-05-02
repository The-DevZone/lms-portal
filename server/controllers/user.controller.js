import Users from "../model/user.model.js"
import bcrypt from "bcrypt"
import { genrateToken } from "../utils/generateToken.js"
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: " Please fill all the fields"
            })
        }
        const user = await Users.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const hasedPassword = await bcrypt.hash(password, 10);
        await Users.created({
            name,
            email,
            password: hasedPassword
        })
        res.status(200).json({
            success: true,
            message: "User registered successfully"
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const login = async (res, req) => {
    console.log(req.body)
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            })
        }
        res.status(200).json({
            success: true,
            message: "User login in successfully"
        })
        genrateToken(res, user, `Welcome back ${user.name}`);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}