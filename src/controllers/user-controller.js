const { UserService } = require("../services/index");
const { successCodes, serverErrorCodes } = require("../utils/error-codes");

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
        return res.status(serverErrorCodes.INTERNAL_SERVER_ERROR).json({
            data : {},
            success : false,
            message : "Not able to create User",
            err : error
        })
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(successCodes.OK).json({
            data : response,
            success : true,
            message : "Successfully SignedIn User",
            err : {}
        })
    } catch (error) {
        console.log(error);
        return res.status(serverErrorCodes.INTERNAL_SERVER_ERROR).json({
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
        return res.status(serverErrorCodes.INTERNAL_SERVER_ERROR).json({
            data : {},
            success : false,
            message : "Not able to Authenticate User",
            err : error
        })
    }
}

const isAdmin = async (req, res) => {
    try {
        const userId = req.body.userId;
        const isAdmin = await userService.isAdmin(userId);
        return res.status(successCodes.OK).json({
            data : isAdmin,
            success : true,
            message : "Successfully Fetched User Role",
            err : {}
        })
    } catch (error) {
        console.log(error);
        return res.status(serverErrorCodes.INTERNAL_SERVER_ERROR).json({
            data : {},
            success : false,
            message : "Not able to Fetch User Role",
            err : error
        })
    }
}

const assignRole = async (req, res) => {
    try {
        const { userId, roleName } = req.body;
        await userService.assignRole(userId, roleName);
        return res.status(successCodes.OK).json({
            data: {},
            success: true,
            message: "Role assigned successfully",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(serverErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: "Failed to assign role",
            err: error
        });
    }
};

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin,
    assignRole
}