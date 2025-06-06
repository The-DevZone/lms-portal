import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"
import { uploadMedia, deleteMediaFromCloudnary } from "../utils/cloudinary.js"

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log("req.body", req.body);
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

export const logout =  (_, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            success: true,
            message: "User logged out successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to logout user"
        })
    }
}

// Export a function called getUserProfile which takes in a request and response object as parameters
export const getUserProfile = async (req, res) => {
    try {
        // Get the user id from the request object
        const userId = req.id;
        // Find the user in the database by their id and select all fields except the password
        const user = await User.findById(userId).select("-password");
        // If the user is not found, return a 404 status code with a message
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        // If the user is found, return a 200 status code with a message and the user object
        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            user
        })
    } catch (error) {
        // If there is an error, return a 500 status code with a message
        return res.status(500).json({
            success: false,
            message: "Failed to get user profile",
        })
    }
}

export const updateUserProfile = async (req, res) => {

    // console.log("req.file", req.file);
    try {
        const userId = req.id;
        const { name } = req.body;
        const profilePhoto = req.file;
        const user = await User.findById(userId);
        // console.log("user", user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if (user.photoUrl) {
            // console.log("user.photoUrl", user.photoUrl);
            const publicId = user.photoUrl.split("/").pop().split(".")[0];
            console.log("publicId", publicId);
            deleteMediaFromCloudnary(publicId);
        }

        const cloudResponce = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudResponce.secure_url;

        const updateData = { name, photoUrl }
        const updateUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");
        if (!updateUser) {
            return res.status(404).json({
                success: false,
                message: "Failed to update user profile"
            })
        }
        return res.status(200).json({
            success: true,
            user: updateUser,
            message: "User profile updated successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to upload user profile"
        })
    }
}

