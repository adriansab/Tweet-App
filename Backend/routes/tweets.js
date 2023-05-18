import express from 'express';
import { verifyToken } from '../verifyToken.js';
import { createTweet, deleteTweet, likeOrDislike, getAllTweets } from '../controllers/tweet.js'


const router = express.Router();

// Create Tweet
router.post("/", verifyToken, createTweet);
// Delete Tweet
router.delete("/:id", verifyToken, deleteTweet);
// Like/Dislike Tweet
router.put("/:id/like", likeOrDislike);
// Get all timeline tweets
router.get("/timeline/:/id", getAllTweets);

export default router;