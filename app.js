const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const connectToDB = require('./config/db.js');
const userRoutes = require('./routes/user.router.js');
const sellerRoutes = require('./routes/seller.routes.js');


connectToDB();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello");
});

app.use('/users', userRoutes);
app.use('/seller', sellerRoutes);

module.exports = app;