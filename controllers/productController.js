const db = require("../models");
const apiResponse = require("../helpers/apiResponse");

const Product = db.products;
const Review = db.reviews;

const addProduct = async (req, res) => {
    let response = {};
    try {        
        const info = {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            published: req.body.published ? req.body.published : false
        };
        const product = await Product.create(info);
        response = apiResponse(true, 200, "Product inserted successfully", product);
    } catch (error) {
        response = apiResponse(false, 500, error.message, null);
    }
    res.status(200).json(response);
}

const getAllProducts = async (req, res) => {
    let response = {};
    let data = [];
    try {
        const products = await Product.findAll({
            attributes: ["id", "title", "price", "description"],            
        });
        await Promise.all(products.map(async product =>  {
            const productReviews = await Review.findAll({where:{product_id: product.id}});            
            data.push({
                product: product,
                reviews: productReviews
            });
        }));        
        response = apiResponse(true, 200, "Products retrieved successfully", data);
    } catch (error) {
        response = apiResponse(false, 500, error.message, null);
    }
    res.status(200).json(response);    
}

const getProduct = async (req, res) => {
    let response = {};
    const data = [];
    try {
        const product = await Product.findByPk(req.params.id);
        const productReviews = await Review.findAll({where:{product_id: product.id}});
        data.push({
            product: product,
            reviews: productReviews
        });
        response = apiResponse(true, 200, "Product retrieved successfully", data);
    } catch (error) {
        response = apiResponse(false, 500, error.message, null);
    }
    res.status(200).json(response);
}

const updateProduct = async (req, res) => {
    let response = {};
    try {
        const product = await Product.update(req.body, {where: { id: req.params.id}});
        response = apiResponse(true, 200, "Product updated successfully", product);
    } catch (error) {
        response = apiResponse(false, 500, error.message, null);
    }
    res.status(200).json(response);
}

const deleteProduct = async (req, res) => {
    let response = {};
    try {
        const product = await Product.findByPk(req.params.id);
        await product.destroy();
        await Review.destroy({where:{product_id: req.params.id}});
        response = apiResponse(true, 200, "Product deleted successfully", product);
    } catch (error) {
        response = apiResponse(false, 500, error.message, null);
    }
    res.status(200).json(response);
}

module.exports = {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}