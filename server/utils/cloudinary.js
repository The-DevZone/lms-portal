import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config({});
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

 export const uploadMedia = async (file) => {
    try {
        const uploadResources = await cloudinary.uploader.upload(file, {
            resource_type:"auto", // Automatically determine the resource type (image, video, etc.)
        })
        return uploadResources
    } catch (error) {
        console.log("Error uploading media to Cloudinary:", error);
    }
}

export const deleteMediaFromCloudnary =  async (publicId) =>{
    try {
         await cloudinary.uploader.destroy(publicId)
         console.log("Media deleted successfully from Cloudinary");
    }catch(error){
        console.log("Error deleting media from Cloudinary:", error);
    }
}

export const deleteVideoFromCloudnary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId ,{ resource_type: "video" });
        console.log("Video deleted successfully from Cloudinary"); //  Log a success message if the video is deleted successfully
    } catch (error) {
        console.log("Error deleting video from Cloudinary:", error);
    }
}

