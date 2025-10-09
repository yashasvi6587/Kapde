import mongoose from "mongoose";
const connectDb=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log("DB COnnected");
        
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/Kapda`)
}
export default connectDb