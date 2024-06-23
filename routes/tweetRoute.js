import express from "express";
import {
  GetAllTweets,
  CreateTweet,
  DeleteTweet,
  LikeOrDislike,
  GetFollowingTweets,
} from "../controllers/tweetController.js";
import { isAuth } from "../config/auth.js";

let router = express.Router();

router.route("/create").post(isAuth, CreateTweet);
router.route("/delete/:id").delete(isAuth, DeleteTweet);
router.route("/likeOrDislike/:id").put(isAuth, LikeOrDislike);
router.route("/getTweets").get(isAuth, GetAllTweets);
router.route("/followingTweets").get(isAuth, GetFollowingTweets);

export default router;
