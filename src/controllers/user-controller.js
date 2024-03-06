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

module.exports = {
    create
}