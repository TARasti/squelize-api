const reviewController = require("../controllers/reviewController");
const router = require("express").Router();

router.get("/:product_id", reviewController.getReviews);
router.get("/:id", reviewController.getReview);
router.post("/", reviewController.createReview);
router.put("/:id", reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);
router.delete("/:product_id", reviewController.deleteProductReviews);

module.exports = router;