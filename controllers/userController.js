const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const apiResponse = require("../helpers/apiResponse");

const User = db.users;

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!(name && email && password)) {
          return res.status(400).send(apiResponse(false, 400, "All input is required", null));
        }
        const oldUser = await User.findOne({where: {email: email }});
        if (oldUser) {
          return res.status(409).send(apiResponse(false, 409, "User Already Exist. Please Login", null));
        }
        encryptedPassword = await bcrypt.hash(password, 10);    
        const token = jwt.sign(
          { email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        const user = await User.create({
          name,
          email,
          password: encryptedPassword,
          token: token
        });
        user.token = token;
        req.session.user = user;
        return res.status(200).json(apiResponse(true, 200, "User registered successfully.", user));
    } catch (err) {
        return res.status(500).send(apiResponse(false, 500, err.message, null));
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
          return res.status(400).send(apiResponse(false, 400, "All input is required", null));
        }
        const user = await User.findOne({where: {email: email }});        
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          user.token = token;
          req.session.user = user;
          return res.status(200).send(apiResponse(true, 200, "User login successfully.", user));
        }
        return res.status(400).send(apiResponse(false, 400, "Invalid Credentials", null));
    } catch (err) {
        return res.status(500).send(apiResponse(false, 500, err.message, null))
    }
}

module.exports = {
    registerUser,
    loginUser
}