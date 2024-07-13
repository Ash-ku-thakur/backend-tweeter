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
    let loggedinUser = await User.findById(id);
    await Tweet.create({
      description,
      userId: id,
      userDetails: loggedinUser,
    });

    // FindUserTweets
    let loggedinUserTweets = await Tweet.find({ userId: id });

    // loggedinUser ke tweets Array me loggedinUser ki tweets ko push kiya ja raha hai
    let tweetsIdPushedInLogedinUserTweets = await Promise.all(
      loggedinUserTweets.map(async (tweetId) => {
        if (!loggedinUser.tweets.includes(tweetId._id)) {
          return await User.findByIdAndUpdate(id, {
            $push: { tweets: tweetId._id },
          });
        }
      })
    );

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
    let loggedinUserId = req.params.id;
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
    let loggedinUserId = req.params.id;
    let loggedinUser = await User.findById(loggedinUserId);

    // console.log(loggedinUser);
    // let loggedinUserTweets = await Tweet.find({ userId: loggedinUserId });
    let followingUserTweet = await Promise.all(
      loggedinUser.following.map((otherUser) => {
        return Tweet.find({ userId: otherUser });
      })
    );

    // console.log(loggedinUser);
    return res.status(201).json({
      massage: "get all following user's tweets",
      success: true,
      tweets: followingUserTweet,
    });
  } catch (error) {
    console.log(error);
  }
};
