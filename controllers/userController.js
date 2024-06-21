import User from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: "../controllers/.env",
});

export let Register = async (req, res) => {
  try {
    let { name, userName, email, password } = req.body;

    // validate for not empty any field
    if (!name || !userName || !email || !password) {
      return res.status(401).json({
        massage: "All fields Are required",
        success: false,
      });
    }
    //  validate one email for one user
    let user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({
        massage: "email is Already exist",
        success: false,
      });
    }

    // account creating with hash password
    let hashPassword = await bcryptjs.hash(password, 10);

    await User.create({
      name,
      userName,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      massage: "Account Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export let Login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // validation for all fields
    if (!email || !password) {
      return res.status(401).json({
        massage: "All Felds Are required",
        success: false,
      });
    }

    let user = await User.findOne({ email });

    // validate user is exist or not
    if (!user) {
      res.status(401).json({
        massage: "user doesn't exist",
        success: false,
      });
    }

    let isMatch = await bcryptjs.compare(password, user.password);

    //  user enterd password is match any one or not
    if (!isMatch) {
      return res.status(401).json({
        massage: "Incorect email or password",
        success: false,
      });
    }

    let token = await jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(201)
      .cookie("token", token, { expiresIn: "id" })
      .json({
        massage: `Welcome back ${user.name}`,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export let Logout = (req, res) => {
  try {
    return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
      massage: "user logout succeccfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};