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
