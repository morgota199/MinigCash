const User = require('../models/User'),
    {Mining} = require('./balance.utils');

const StartMining = async () => {
    const allUsers = await User.find();

    for(let user of allUsers){
        await Mining(user);
    }
};

module.exports = {StartMining};