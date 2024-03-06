const bcrypt = require('bcrypt');

module.exports = {
    SALT : bcrypt.genSaltSync(10),
    PORT : process.env.PORT
}