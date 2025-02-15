const { UserRepository } = require('../repository/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {JWT_KEY} = require('../config/server_config');

class UserService {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            throw {error};
        }
    }

    async signIn(email, plainPassword) {
        try {
            // fetching the user using the email
            const user = await this.userRepository.getByEmail(email);
            // comparing incoming plain password with stored encrypted password
            const passwordsMatch = this.checkPassword(plainPassword, user.password);

            if(!passwordsMatch) {
                console.log("Password doesn't match");
                throw {error: 'Incorrect password'};
            }
            // If passwords match then create JWT token and send it to the user
            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in the sign in process");
            throw error;
        }
    }

    async isAuthenticated(email, token) {
        try {
            // fetching the user using the email
            const user = await this.userRepository.getByEmail(email);
            if (!user) {
                console.log("User not found of corresponding email");
                throw {error: 'User not found'};
            }
            // verifying the token
            const response = this.verifyToken(token);
            
            // checking if the email in the token and the email in the database are same
            if(response.email !== user.email) {
                console.log("Email doesn't match");
                throw {error: 'Incorrect email'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the authentication process");
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }
}

module.exports = UserService;