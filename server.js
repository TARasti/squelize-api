const express = require("express");
const cors = require("cors");
require("dotenv").config();
const auth = require("./middlewares/auth");
const session = require("express-session");

const app = express();
let corsOption = {
    origin: 'http://localhost:3000'
}

// middlewares
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
}));

// routes
const productRoutes = require("./routes/productRouter");
const reviewRoutes = require("./routes/reviewRouter");
const userRoutes = require("./routes/userRouter");
app.use("/api/products", auth, productRoutes);
app.use("/api/reviews", auth, reviewRoutes);
app.use("/api/users", userRoutes);

// default route
app.get("/",auth, (req, resp) => {
    resp.status(200).send({
        product_endpoints: {
            "insert product[post]": "/api/products/",
            "get products[get]": "/api/products/",
            "get product[get]": "/api/products/:id",
            "update product[put]": "/api/products/:id",
            "delete product[delete]": "/api/products/:id"
        },
        review_endpoints: {
            "insert review[post]": "/api/reviews/",
            "get reviews[get]": "/api/reviews/:product_id",
            "get review[get]": "/api/reviews/:id",
            "update review[put]": "/api/reviews/:id",
            "delete review[delete]": "/api/reviews/:id",
            "delete product reviews[delete]": "/api/reviews/:product_id"
        }
    });
});
app.get('*', function(req, res) {
    res.redirect('/');
});
// port
const PORT = process.env.PORT || 3000;
// starting server
app.listen(PORT, ()=>console.log("Server is listening at port "+ PORT));