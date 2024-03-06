const successCodes = Object.freeze({
    OK : 200,
    CREATED : 201
})

const clientErrorCodes = Object.freeze({
    BAD_REQUEST : 400,
    UNAUTHORIZED : 401,
    NOT_FOUND : 404
})

module.exports = {
    successCodes, 
    clientErrorCodes
}