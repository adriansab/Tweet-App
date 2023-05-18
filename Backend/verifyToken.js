import jwt from 'jsonwebtoken';
import { errorHandler } from './errorHandler.js';


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    
    if (!token) return next(errorHandler(401, 'You are not authenticated.'));
    
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, 'Token is invalid'));
        req.user = user;
        next();
    });
};
