import express from "express";
import {
  Bookmarks,
  Follow,
  GetMyProfile,
  GetOtherUser,
  Login,
  Logout,
  Register,
} from "../controllers/userController.js";
import { isAuth } from "../config/auth.js";

let router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
// isAuth ko band kia hai
router.route("/bookmark/:id").put(Bookmarks);
router.route("/profile/:id").get(GetMyProfile);
router.route("/otheruser/:id").get(GetOtherUser);
router.route("/follow/:id").put(Follow);

export default router;
