import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";

dotenv.config({
  path: ".env",
});

databaseConnection();
let app = express();

// middelwares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tweet", tweetRoute);

app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
