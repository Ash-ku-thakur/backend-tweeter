import Tweet from "../models/tweetSchema.js";

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
