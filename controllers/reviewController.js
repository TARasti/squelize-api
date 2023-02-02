const db = require("../models");
const apiResponse = require("../helpers/apiResponse");

const Review = db.reviews;

const createReview = async (req, res) => {
    let response = {};
    try {
        const user = req.session.user;
        const info = {
            product_id: req.body.product_id,
            user_id: user.id,
            rating:  req.body.rating,
            description: req.body.description
        };
        
        const review = await Review.create(info);
        response = apiResponse(true, 200, "Inserting review", review);
    } catch (err) {
        response = apiResponse(false, 500, "Error inserting review", err);
    }
    return res.status(200).json(response);
}

const getReviews = async (req, res) => {
    let response = {};
    try {
        const reviews = await Review.findAll({where:{product_id: req.params.product_id}});
        response = apiResponse(true, 200, "Reviews retrieved successfully", reviews);    
    } catch (err) {
        response = apiResponse(false, 500, "Error retrieving reviews", err);
    }    
    return res.status(200).json(response);    
}

const getReview = async (req, res) => {
    let response = {};
    try {
        const review = await Review.findByPk(req.params.id);
        response = apiResponse(true, 200, "Review retrieved successfully", review);        
    } catch (err) {
        response = apiResponse(false, 500, "Error retrieving review", err);        
    }
    return res.status(200).json(response);
}

const deleteReview = async (req, res) => {
    let response = {};
    try {
        const review = await Review.destroy({where:{id: req.params.id}});
        response = apiResponse(true, 200, "Review deleted successfully", review);
    } catch (err) {
        response = apiResponse(false, 500, "Error deleting review", err);
    }
    return res.status(200).json(response);
}

const deleteProductReviews = async (req, res) => {
    let response = {};
    try {
        const reviews = await Review.destroy({where:{product_id: req.params.product_id}});
        response = apiResponse(true, 200, "Reviews deleted successfully", reviews);
    } catch (err) {
        response = apiResponse(false, 500, "Error deleting reviews", err);
    }
    return res.status(200).json(response);
}

const updateReview = async (req, res) => {
    let response = {};
    try {
        const review = await Review.update(req.body, {where:{id: req.params.id}});
        response = apiResponse(true, 200, "Review updated successfully", review);
    } catch (err) {
        response = apiResponse(false, 500, "Error updating review", err);
    }
    return res.status(200).json(response);
}

module.exports = {
    createReview,
    getReview,
    getReviews,
    deleteReview,
    deleteProductReviews,
    updateReview
}