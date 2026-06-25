const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const connectToDB = require('./config/db.js');
const userRoutes = require('./routes/user.router.js');
const sellerRoutes = require('./routes/seller.routes.js');
const designRoutes = require('./routes/design.routes.js');
const orderRoutes = require('./routes/orders.routes.js');
const slotTime = require('./routes/slotTime.routes.js');
const bookSlot = require('./routes/bookSlot.routes.js');
const authUser = require('./middlewares/auth.middleware.js');
const authSeller = require('./middlewares/auth.middleware.js');


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
app.use('/api/designs', designRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/slot-time', slotTime);
app.use('/api/book-slots', bookSlot);

module.exports = app;