const userModel = require('../models/user.model');
const sellerModel = require('../models/seller.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const blackListTokenModel = require('../models/blacklistToken.model');


module.exports.authUser = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message: "unauthorized"});
    };

    const isBlacklisted = await blackListTokenModel.findOne({token: token});

    if(isBlacklisted){
        return res.status(401).json({message: "unauthorized"});
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id).select('-password');

        if(!user){
            return res.status(401).json({message: "unauthorized"});
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({message: "unauthorized"});
    }
};


module.exports.authSeller = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });



    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const seller = await sellerModel.findById(decoded._id)
        req.seller = seller;

        return next()
    } catch (err) {
        console.log(err);

        res.status(401).json({ message: 'Unauthorized' });
    }
};