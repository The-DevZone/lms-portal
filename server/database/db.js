import mongoose from "mongoose";

const dbConnect = async () => {
    try{ // Try to connect to the database using the Mongoose library
        await mongoose.connect(process.env.MONGO_URI) // Connect to the database using the URI stored in the environment variables
        console.log("mongo db connected");
    }catch(err){
        console.error("mongo db connection failed" +  err) // Log the error to the console
    } finally {
        // Any additional steps after attempting to connect to the database can go here
    }
}
 export default dbConnect; // Export the dbConnect function so it can be used in other files
