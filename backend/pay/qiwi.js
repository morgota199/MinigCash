const { Qiwi } = require('node-qiwi-api');
const Wallet = new Qiwi('3de2c70983d6184a34ce2ef390230b1d');

const getQiwiBalance = () => {return new Promise(res => {Wallet.getBalance((err, data) => res(data))})};

const getQiwiAccountInfo = () => {return new Promise(res => {Wallet.getAccountInfo((err, info) => res(info))})};

module.exports = { Wallet, getQiwiBalance, getQiwiAccountInfo };