const express = require("express");
const router = express.Router();

const UserController = require("../../controllers/user-controller");
const { AuthValidators } = require("../../middlewares");

router.post("/signup", AuthValidators.validateUserAuth, UserController.create);
router.post("/signin", AuthValidators.validateUserAuth, UserController.signIn);
router.post("/isAuthenticated", UserController.isAuthenticated)

module.exports = router;