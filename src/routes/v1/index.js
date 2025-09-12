const express = require("express");
const router = express.Router();

const UserController = require("../../controllers/user-controller");
const { AuthValidators } = require("../../middlewares");

router.post("/signup", AuthValidators.validateUserAuth, UserController.create);
router.post("/signin", AuthValidators.validateUserAuth, UserController.signIn);
router.post("/isAuthenticated", UserController.isAuthenticated)
router.get("/isAdmin", AuthValidators.validateIsAdminRequest, UserController.isAdmin);
router.post("/assignRole", UserController.assignRole);

module.exports = router;