const jwt = require("jsonwebtoken"),
      User = require('../models/User'),
      config = require('config');

const isAuth = async (req) => {
    const { token }  = req.headers;

    const { userId, userName, email } = jwt.decode(token, config.get('HESHER'));

    return await User.findOne({_id: userId, userName, email});;
};

module.exports = { isAuth };