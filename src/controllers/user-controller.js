const { UserService } = require("../services/index");
const { successCodes } = require("../utils/error-codes");

const userService = new UserService();

const create = async (req, res) => {
    try {
        const user = await userService.create(req.body);
        return res.status(successCodes.CREATED).json({
            data : user,
            success : true,
            message : "Successfully created User",
            err : {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data : {},
            success : false,
            message : "Not able to create User",
            err : error
        })
    }
}

const signIn = async (req, res) => {
    try {
        const user = await userService.signIn(req.body.email, req.body.password);
        return res.status(successCodes.OK).json({
            data : user,
            success : true,
            message : "Successfully SignedIn User",
            err : {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data : {},
            success : false,
            message : "Not able to SignIn User",
            err : error
        })
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token']
        const userId = await userService.isAuthenticated(req.body.email, token);
        return res.status(successCodes.OK).json({
            data : userId,
            success : true,
            message : "Successfully Authenticated User",
            err : {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data : {},
            success : false,
            message : "Not able to Authenticate User",
            err : error
        })
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated
}