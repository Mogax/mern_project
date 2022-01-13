const UserModel = require('../models/user.model');
const fs = require('fs');
const { promisify } = require('util');
const {uploadErrors} = require("../utils/errors.utils");
const pipeline = promisify(require('stream').pipeline);

module.exports.uploadProfil = async (req, res) => {
    try {
        console.log(req.file.detectedMimeType)
        if (req.file.detectedMimeType !== 'image/jpg' && req.file.detectedMimeType !=='image/jpeg' && req.file.detectedMimeType !=='image/png'){
            throw Error("invalid file")
        }
        if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json({errors})
    }

    const fileName = req.body.name + ".jpg";

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/profil/${fileName}`
        )
    );

    try {
        const docs = await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set : {picture: './uploads/profil/' + fileName}},
            {new: true, upsert: true, setDefaultsOnInsert: true},
        )
        return res.send(docs)
    } catch (err) {
        return res.status(500).send({message: err})
    }
}
