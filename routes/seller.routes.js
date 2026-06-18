const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const sellerController = require('../controllers/seller.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',[
    body('name').isString().withMessage('name must be a string')
    .isLength({min:3}).withMessage('name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please fill a valid email address'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
],
    sellerController.registerSeller
);

router.post('/login', [
    body('email').isEmail().withMessage('Please fill a valid email address'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],
    sellerController.loginSeller
);

router.get('/profile', authMiddleware.authSeller, sellerController.getSellerProfile);

router.post('/logout', authMiddleware.authSeller, sellerController.logoutSeller);

module.exports = router;