import Tweet from "../models/tweetSchema.js";
import User from "../models/userSchema.js";

// tweetCreate
export let CreateTweet = async (req, res) => {
  try {
    let { description, id } = req.body;

    // validation for receving description and userId
    if (!description || !id) {
      return res.status(401).json({
        massage: "Description and id are required",
        success: false,
      });
    }

    // Tweet create
    await Tweet.create({
      description,
      userId: id,
    });

    return res.status(201).json({
      massage: "Tweet Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// delete tweet
export let DeleteTweet = async (req, res) => {
  try {
    let { id } = req.params;
    await Tweet.findByIdAndDelete(id);
    return res.status(201).json({
      massage: "tweet delete successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// like or dislike
export let LikeOrDislike = async (req, res) => {
  try {
    let loggedInUserId = req.body.id; // user that one create that tweet
    let tweetId = req.params.id; // tweet

    let tweet = await Tweet.findById(tweetId);

    if (tweet.like.includes(loggedInUserId)) {
      // dislike (pull)
      await Tweet.findByIdAndUpdate(tweetId, {
        $pull: { like: loggedInUserId },
      });
      return res.status(201).json({
        massage: "user dislike your tweet",
        success: true,
      });
    } else {
      // like (push)
      await Tweet.findByIdAndUpdate(tweetId, {
        $push: { like: loggedInUserId },
      });
      return res.status(201).json({
        massage: "user like your tweet",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// getAllTweets
export let GetAllTweets = async (req, res) => {
  try {
    // loggedinUser + following user's tweets
    let loggedinUserId = req.body.id;
    let loggedinUser = await User.findById(loggedinUserId);
    let loggedinUserTweets = await Tweet.find({ userId: loggedinUserId });

    let followingUserTweet = await Promise.all(
      loggedinUser.following.map((otherUser) => {
        return Tweet.find({ userId: otherUser });
      })
    );

    return res.status(201).json({
      tweets: loggedinUserTweets.concat(...followingUserTweet),
    });
  } catch (error) {
    console.log(error);
  }
};

// getFollowingTweets
export let GetFollowingTweets = async (req, res) => {
  try {
    let loggedinUserId = req.body.id;
    let loggedinUser = await User.findById(loggedinUserId);
    // let loggedinUserTweets = await Tweet.find({ userId: loggedinUserId });

    let followingUserTweet = await Promise.all(
      loggedinUser.following.map((otherUser) => {
        return Tweet.find({ userId: otherUser });
      })
    );

    return res.status(201).json({
      tweets: followingUserTweet,
    });
  } catch (error) {
    console.log(error);
  }
};
