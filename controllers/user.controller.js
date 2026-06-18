const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const userService = require('../services/user.services');
const blackListTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const {name, email, password} = req.body;

    const existingUser = await userModel.findOne({email});
    if(existingUser){
        return res.status(400).json({error: 'User with this email already exists'});
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        name,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(400).json({message: "invalid email or password"});
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({token, user});
};

module.exports.getUserProfile = async (req, res) => {
    res.status(200).json({user: req.user});
};

module.exports.logoutUser = async (req, res) => {
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    await blackListTokenModel.create({token});

    res.status(200).json({message: "loggead out successfully"});
};