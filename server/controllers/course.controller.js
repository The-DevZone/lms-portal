import Course from "../models/course.model.js";

const createCourse = async (req, res) => {
    try {

        const { courseTitle, category } = req.body;
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

    } catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
        })
    }
}