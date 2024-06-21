import express from "express";
import { CreateTweet, DeleteTweet, LikeOrDislike } from "../controllers/tweetController.js";
import { isAuth } from "../config/auth.js";

let router = express.Router();

router.route("/create").post(isAuth ,CreateTweet);
router.route("/delete/:id").delete(isAuth ,DeleteTweet);
router.route("/likeOrDislike/:id").put(isAuth ,LikeOrDislike);

export default router;
