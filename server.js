const express = require("express");
const cors = require("cors");
require("dotenv").config();


const app = express();
let corsOption = {
    origin: 'http://localhost:3000'
}

// middlewares
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const productRoutes = require("./routes/productRouter");
const reviewRoutes = require("./routes/reviewRouter");
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);

// default route
app.get("/", (req, resp) => {
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
// port
const PORT = process.env.PORT || 3000;
// starting server
app.listen(PORT, ()=>console.log("Server is listening at port "+ PORT));