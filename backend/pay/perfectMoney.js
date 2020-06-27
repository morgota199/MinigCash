const advcash = require('advcash');

const options = {
    password: 'mrx35313531',
    apiName: '697hIMvJ2s5BkwcSPophIUrXi',
    accountEmail: 'morgota199@gmail.com'
};

const arguments = {
    from: "BTC",
    to: "USD",
    action: "SELL",
    amount: 0.5
};

const AuthADV = async () => {
    try{
        const data = await advcash(options);
        return data;
    } catch (e) {
        return e.message;
    }
};

module.exports = { AuthADV };