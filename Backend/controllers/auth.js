import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../errorHandler.js';

export const signUp = async (req, res, next) => {
    
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT);

        const { password, ...otherData } = newUser._doc;
        res
            .cookie('access_token', token, {
            httpOnly: true,
        })
            .status(200)
            .json(otherData);
    } catch (err) {
        next(err);
        
    }
};    
    
    
    
export const signIn = async (req, res, next) => {
    
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(errorHandler(404, 'User not found'));
        
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return next(errorHandler(401, 'Invalid credentials'));
        
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        const { password, ...otherData } = user._doc;
        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(otherData);

    } catch (err) {
        next(err);
        
    }
};        
