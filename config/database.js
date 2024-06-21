import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "../config/.env",
});

let databaseConnection = async() =>{
try {
   let connect =  await mongoose.connect(process.env.MONGO_URI)
   if (!connect) {
      return console.log(connect);
    }
    console.log("connected to mongo db");
} catch (error) {
    console.log(error);
}
}
export default databaseConnection