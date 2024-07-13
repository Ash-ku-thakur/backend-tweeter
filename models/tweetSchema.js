import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      require: true,
    },
    like: {
      type: Array,
      default: [],
    },

    userId: {
      type: [String],
      ref: "User",
    },
    userDetails: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Tweet = mongoose.model("Tweet", tweetSchema);
export default Tweet;
