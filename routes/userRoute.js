import express from "express";
import {
  Bookmarks,
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
router.route("/bookmark/:id").put(isAuth, Bookmarks);
router.route("/profile/:id").get(isAuth, GetMyProfile);
router.route("/otheruser/:id").get(isAuth, GetOtherUser);

export default router;
