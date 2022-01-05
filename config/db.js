const mongoose = require("mongoose");
require('dotenv').config({path: ('./config/.env')});

mongoose.connect('mongodb+srv://'+ process.env.DB_USER_PASS +'@cluster0.mar83.mongodb.net/mern-project')
    .then(() => console.log('Connected to MondoDB'))
    .catch((err) => console.log('Failed to connect to MondoDB'))

// {userNewParser: true,
// useUnifiedTopology: true,
// useCreateIndex: true,
// useFindAndModify: false}
