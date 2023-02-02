const userController = require("../controllers/userController");
const router = require("express").Router();


router.post("/login", userController.loginUser);
router.post("/", userController.registerUser);

module.exports = router;