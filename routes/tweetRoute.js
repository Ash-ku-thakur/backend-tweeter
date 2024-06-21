import express from "express";
import { CreateTweet } from "../controllers/tweetController.js";
import { isAuth } from "../config/auth.js";

let router = express.Router();

router.route("/create").post(isAuth ,CreateTweet);

export default router;
