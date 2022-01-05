const userModel = require('../models/user.model')

module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body

    try {
        console.log(req.body)
        const user = await userModel.create({pseudo, email, password})
        res.status(201).json({user: user._id})
    }
    catch(err) {
        console.log("Error pass 12")
        res.status(200).send({ err })
    }
}
