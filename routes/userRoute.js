import express from "express";
import { Login, Logout, Register } from "../controllers/usercontroller.js";

let router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);

export default router;
