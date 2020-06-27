const User = require('../models/User');

const Mining = (user) => {
    const interval = setInterval(async () => {
        const thisUser = await User.findOne({_id: user.id, userName: user.userName, email: user.email});

        if(thisUser) {
            const GHS = thisUser.money.GHS;
            let pro = 0.012;

            if (GHS < 150) {
                pro = 0.012;
            } else if (GHS >= 150 && GHS < 500) {
                pro = 0.015;
            } else if (GHS >= 500 && GHS < 1500) {
                pro = 0.017;
            } else if (GHS >= 1500 && GHS < 3000) {
                pro = 0.02;
            } else if (GHS >= 3000) {
                pro = 0.025;
            }

            if (thisUser.power.bitcoin !== 0) thisUser.money.bitcoin += ((thisUser.money.ghs / 100) * ((pro / 100) * thisUser.power.bitcoin)) / 86400;
            if (thisUser.power.ethereum !== 0) thisUser.money.ethereum += ((thisUser.money.ghs / 100) * ((pro / 100) * thisUser.power.ethereum)) / 86400;
            if (thisUser.power.litecoin !== 0) thisUser.money.litecoin += ((thisUser.money.ghs / 100) * ((pro / 100) * thisUser.power.litecoin)) / 86400;
            if (thisUser.power.usd !== 0) thisUser.money.usd += ((thisUser.money.ghs / 100) * ((pro / 100) * thisUser.power.usd)) / 86400;

            await thisUser.save();
        } else {
            return clearInterval(interval);
        }
    }, 1000);
};

module.exports = { Mining };