const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodeToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie(jwt, '', { maxAge: 1});//TODO if cookie delete : 2:56:00
            } else {
                res.locals.user = await UserModel.findById(decodeToken.id);
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodeToken) => {
            if (err) {
                console.log(err)
            } else {
                next();
            }
        });
    } else {
        console.log('No token');

    }
}
