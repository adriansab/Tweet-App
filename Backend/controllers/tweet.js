import Tweet from "../models/tweet.model.js";
import { errorHandler } from "../errorHandler.js";
import User from "../models/user.model.js";


export const createTweet = async (req, res, next) => {
    const newTweet = new Tweet(req.body);
    try {
        const savedTweet = await newTweet.save();
        res.status(200).json(savedTweet);
    } catch (err) {
        errorHandler(500, err);
    }
};

export const deleteTweet = async (req, res, next) => {
    const newTweet = new Tweet(req.body);
    try {
        const tweet = await Tweet.findById(req.params.id);
        if (Tweet.userId === req.body.id) {
            await tweet.deleteOne();
            res.status(200).json(" Tweet has been deleted")
        } else {
            errorHandler(500, err);
        }
    } catch (err) {
        errorHandler(500, err);
    }

};

export const likeOrDislike = async (req, res, next) => {
    
    try {
        const tweet = await Tweet.findById(req.params.id);
        if (!tweet.likes.includes(req.body.id)) {
            await tweet.updateOne({ $push: { likes: req.body.id } });
            res.status(200).json(" Tweet has been liked");
            
        } else {
            await tweet.updateOne({ $pull: { likes: req.body.id } });
            res.status(200).json(" Tweet has been disliked");
        }
    } catch (err) {
        errorHandler(500, err);
    }
};

export const getAllTweets = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.params.id);
        const userTweets = await User.find({ userId: currentUser._id });
        const followersTweets = await Promise.all(currentUser.following.map((followerId) => {
            return Tweet.find({ userId: followerId });
        })
        );
        res.status(200).json(userTweets.concat(...followersTweets));
    
    } catch (err) {
        errorHandler(500, err);
    }
};