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

export let Bookmarks = async (req, res) => {
  try {
    let loggedinUser = req.body.id;
    let tweetId = req.params.id;

    let user = await User.findById(loggedinUser);

    if (user.bookmark.includes(tweetId)) {
      // dislike (pull)
      await User.findByIdAndUpdate(loggedinUser, {
        $pull: { bookmark: tweetId },
      });
      return res.status(201).json({
        massage: "user unBookmark your tweet",
        success: true,
      });
    } else {
      await User.findByIdAndUpdate(loggedinUser, {
        $push: { bookmark: tweetId },
      });
      return res.status(201).json({
        massage: "user bookmark your tweet",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export let GetMyProfile = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findById(id).select("-password, -email");

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export let GetOtherUser = async (req, res) => {
  try {
    let myId = req.params.id;

    // myId is not equal other id
    let otherUser = await User.find({ _id: { $ne: myId } }).select(
      "-email, -password"
    );
    console.log(otherUser);

    if (!otherUser) {
      return res.status(401).json({
        massage: "Currently you doen't have any user",
      });
    }
    return res.status(201).json({
      otherUser,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export let Follow = async (req, res) => {
  try {
    let loggedinUserId = req.body.id; // logged in user
    let likedPerson = req.params.id; // followed by user

    // find who follows and who to follows
    let loggedinUser = await User.findById(loggedinUserId);
    let likedUser = await User.findById(likedPerson);

    // user cann't follow yourself
    if (loggedinUserId == likedPerson) {
      return res.status(401).json({
        massage: "You cann't follow yourself",
      });
    }

    // if not follow then follow and wise versa
    if (!loggedinUser.following.includes(likedPerson)) {
      await User.findByIdAndUpdate(likedPerson, {
        $push: { followers: loggedinUserId },
      }).select("-password");
      await User.findByIdAndUpdate(loggedinUserId, {
        $push: { following: likedPerson },
      }).select("-password");
      return res.status(201).json({
        massage: `${loggedinUser.name} just followed ${likedUser.name}`,
        success: true,
      });
    } else {
      await User.findByIdAndUpdate(likedPerson, {
        $pull: { followers: loggedinUserId },
      }).select("-password");
      await User.findByIdAndUpdate(loggedinUserId, {
        $pull: { following: likedPerson },
      }).select("-password");
      return res.status(201).json({
        massage: `${loggedinUser.name} just unFollowed ${likedUser.name}`,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
