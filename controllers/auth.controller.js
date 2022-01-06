const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const {signUpErrors, signInErrors} = require("../utils/errors.utils");

const maxAge = 3 * 24 * 3600 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body;

    try {
        const user = await userModel.create({pseudo, email, password});
        res.status(201).json({user: user._id});
    }
    catch(err) {
        const error = signUpErrors(err);
        res.status(200).send(error);
    }
}

module.exports.signIn = async (req, res) => {
    const {email, password } = req.body

    try {
        const user = await userModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly:true, maxAge:maxAge});
        res.status(200).json({user: user._id});
    } catch (err) {
        const error = signInErrors(err);
        res.status(500).send(err);
    }
}

module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1});
    res.redirect('/');
}
