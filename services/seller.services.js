const sellerModel = require('../models/seller.model');

module.exports.createSeller = async ({
    name, email, password
}) => {
    if (!name || !email || !password) {
        throw new Error('All fields are required');
    }
    const seller = sellerModel.create({
        name,
        email,
        password,
    })

    return seller;
}