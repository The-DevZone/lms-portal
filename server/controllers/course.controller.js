import {Course} from "../model/course.model.js";

 export const createCourse = async (req, res) => {
    try {

        const { courseTitle, category } = req.body;
        console.log("req.body", req.body); 
        if (!courseTitle || !category) {
            res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            })
        }

        const course = await Course.create({
            courseTitle,
            category,
            creator: req.id
        })
        res.status(201).json({
            success: true,
            message:"course created successfully",
            course
        })

    } catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
        })
    }
}