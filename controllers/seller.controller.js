const sellerModel = require('../models/seller.model');
const sellerService = require('../services/seller.services');
const blackListTokenModel = require('../models/blacklistToken.model');
const {validationResult} = require('express-validator');

module.exports.registerSeller = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // console.log(fullName, email, password, vehicle);

    const isSellerAlreadyExist = await sellerModel.findOne({ email });

    if (isSellerAlreadyExist) {
        return res.status(400).json({ message: 'Seller already exist' });
    }


    const hashedPassword = await sellerModel.hashPassword(password);

    const seller = await sellerService.createSeller({
        name,
        email,
        password: hashedPassword,
    });

    const token = seller.generateAuthToken();

    res.status(201).json({ token, seller });

};


module.exports.loginSeller = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const seller = await sellerModel.findOne({ email }).select('+password');

    if (!seller) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await seller.comparePassword(password);
    // console.log(captain.password, password);
    

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = seller.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, seller });
};


module.exports.getSellerProfile = async (req, res, next) => {
    res.status(200).json({ seller: req.seller });
};


module.exports.logoutSeller = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    await blackListTokenModel.create({ token });

    res.clearCookie('token');

    res.status(200).json({ message: 'Logout successfully' });
}
