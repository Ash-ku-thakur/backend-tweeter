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

// isAuth
router.route("/create").post(CreateTweet);
router.route("/delete/:id").delete(DeleteTweet);
router.route("/like/:id").put(LikeOrDislike);
router.route("/getTweets/:id").get(GetAllTweets);
router.route("/followingTweets/:id").get(GetFollowingTweets);

export default router;
