const { check, validationResult } = require('express-validator'),
    { Router }                  = require('express'),
    User                        = require('../models/User'),
    Pay                         = require('../models/Pay'),
    Replenishment               = require('../models/Replenishment');

const {isAuth} = require("../utils/auth.utils");

const router = Router();

//pay-in routes
//пополнение GHS через QIWI
router.post('/profile/pay-in/qiwi', [
    check('number', "Не корректный номер").isMobilePhone(['ru-RU', 'uk-UA', "en-US"]),
    check('RUB', "Не корректрая сумма").isNumeric()
],async (req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: "Некоректные данные"});
        }

        const { number, RUB, comment, ghs } = req.body,
            user = await isAuth(req);

        if(!user) return  res.status(401).json({ message: "Tокен не верен" });

        const replenishment = new Replenishment({
            userId:       user._id,
            userName:     user.userName,
            system:       "Qiwi",
            number:       number,
            money:        RUB,
            usd:          ghs,
            date:         Date.now()
        })

        await replenishment.save();

        user.money.ghs = Number(user.money.ghs) + Number(ghs);

        await user.save();

        if(user.forRef){
            const forRef = await User.findById(user.forRef),
                refRegisterLength = forRef.ref.ref_register.length;

            if(refRegisterLength >= 10 && refRegisterLength < 20)forRef.money.ref_money += ghs * 0.01;
            else if(refRegisterLength >= 20 && refRegisterLength < 100)forRef.money.ref_money += ghs * 0.03;
            else if(refRegisterLength >= 100)forRef.money.ref_money += ghs * 0.05;

            forRef.save();
        }

        return res.status(201).json({ money: {
                GHS:      user.money.ghs,
                BITCOIN:  user.money.bitcoin,
                ETHEREUM: user.money.ethereum,
                LITECOIN: user.money.litecoin,
                USD:      user.money.usd,
                REF_MONEY:user.money.ref_money
            },
            message:  "Оплачено"
        });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//пополнение GHS через Payeer
router.post('/profile/pay-in/payeer', [
    check('USD', "Не корректрая сумма").isNumeric()
],async (req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(400).json({errors: errors.array(), message: "Некоректные данные"});

        const { number, ghs } = req.body,
            user = await isAuth(req);

        if(!user) return  res.status(401).json({ message: "Tокен не верен" });
        if(number === 0 || number === '') return res.status(201).json({ message: "Поле кошелька пустое" });

        const replenishment = new Replenishment({
            userId:       user._id,
            userName:     user.userName,
            system:       "Payeer",
            number:       number,
            money:        ghs,
            usd:          ghs,
            date:         Date.now()
        })

        await replenishment.save();

        user.money.ghs = Number(user.money.ghs) + Number(ghs);

        await user.save();

        if(user.forRef){
            const forRef = await User.findById(user.forRef),
                refRegisterLength = forRef.ref.ref_register.length;

            if(refRegisterLength >= 10 && refRegisterLength < 20)forRef.money.ref_money += ghs * 0.01;
            else if(refRegisterLength >= 20 && refRegisterLength < 100)forRef.money.ref_money += ghs * 0.03;
            else if(refRegisterLength >= 100)forRef.money.ref_money += ghs * 0.05;

            forRef.save();
        }

        return res.status(201).json({ money: {
                GHS:      user.money.ghs,
                BITCOIN:  user.money.bitcoin,
                ETHEREUM: user.money.ethereum,
                LITECOIN: user.money.litecoin,
                USD:      user.money.usd,
                REF_MONEY:user.money.ref_money
            },
            message:  "Оплачено"
        });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//пополнение GHS через Bitcoin
router.post('/pay-in/bitcoin', [
    check('BTC', "Не корректрая сумма").isNumeric()
],async (req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(400).json({errors: errors.array(), message: "Некоректные данные"});

        const { number, BTC, ghs } = req.body,
            user = await isAuth(req);

        if(!user) return res.status(401).json({ message: "Tокен не верен" });
        if(number === null) return res.status(201).json({ message: "Поле кошелька пустое" });

        const replenishment = new Replenishment({
            userId:       user._id,
            userName:     user.userName,
            system:       "Bitcoin",
            number:       number,
            money:        BTC,
            usd:          ghs,
            date:         Date.now()
        })

        await replenishment.save();

        user.money.ghs = Number(user.money.ghs) + Number(ghs);

        await user.save();

        if(user.forRef){
            const forRef = await User.findById(user.forRef),
                refRegisterLength = forRef.ref.ref_register.length;

            if(refRegisterLength >= 10 && refRegisterLength < 20)forRef.money.ref_money += ghs * 0.01;
            else if(refRegisterLength >= 20 && refRegisterLength < 100)forRef.money.ref_money += ghs * 0.03;
            else if(refRegisterLength >= 100)forRef.money.ref_money += ghs * 0.05;

            forRef.save();
        }

        return res.status(201).json({ money: {
                GHS:      user.money.ghs,
                BITCOIN:  user.money.bitcoin,
                ETHEREUM: user.money.ethereum,
                LITECOIN: user.money.litecoin,
                USD:      user.money.usd,
                REF_MONEY:user.money.ref_money
            },
            message:  "Оплачено"
        });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//пополнение GHS через Litecoin
router.post('/pay-in/litecoin', [
    check('LTC', "Не корректрая сумма").isNumeric()
],async (req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(400).json({errors: errors.array(), message: "Некоректные данные"});

        const { number, LTC, ghs } = req.body,
            user = await isAuth(req);

        if(!user) return res.status(401).json({ message: "Tокен не верен" });
        if(number === null) return res.status(201).json({ message: "Поле кошелька пустое" });


        const replenishment = new Replenishment({
            userId:       user._id,
            userName:     user.userName,
            system:       "Litecoin",
            number:       number,
            money:        LTC,
            usd:          ghs,
            date:         Date.now()
        })

        await replenishment.save();

        user.money.ghs = Number(user.money.ghs) + Number(ghs);

        await user.save();

        if(user.forRef){
            const forRef = await User.findById(user.forRef),
                refRegisterLength = forRef.ref.ref_register.length;

            if(refRegisterLength >= 10 && refRegisterLength < 20)forRef.money.ref_money += ghs * 0.01;
            else if(refRegisterLength >= 20 && refRegisterLength < 100)forRef.money.ref_money += ghs * 0.03;
            else if(refRegisterLength >= 100)forRef.money.ref_money += ghs * 0.05;

            forRef.save();
        }

        return res.status(201).json({ money: {
                GHS:      user.money.ghs,
                BITCOIN:  user.money.bitcoin,
                ETHEREUM: user.money.ethereum,
                LITECOIN: user.money.litecoin,
                USD:      user.money.usd,
                REF_MONEY:user.money.ref_money
            },
            message:  "Оплачено"
        });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//пополнение GHS через Ethereum
router.post('/pay-in/ethereum', [
    check('ETC', "Не корректрая сумма").isNumeric()
],async (req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(400).json({errors: errors.array(), message: "Некоректные данные"});

        const { number, ETC, ghs } = req.body,
            user = await isAuth(req);

        if(!user) return res.status(401).json({ message: "Tокен не верен" });
        if(number === null) return res.status(201).json({ message: "Поле кошелька пустое" });


        const replenishment = new Replenishment({
            userId:       user._id,
            userName:     user.userName,
            system:       "Ethereum",
            number:       number,
            money:        ETC,
            usd:          ghs,
            date:         Date.now()
        })

        await replenishment.save();

        user.money.ghs = Number(user.money.ghs) + Number(ghs);

        await user.save();

        if(user.forRef){
            const forRef = await User.findById(user.forRef),
                refRegisterLength = forRef.ref.ref_register.length;

            if(refRegisterLength >= 10 && refRegisterLength < 20)forRef.money.ref_money += ghs * 0.01;
            else if(refRegisterLength >= 20 && refRegisterLength < 100)forRef.money.ref_money += ghs * 0.03;
            else if(refRegisterLength >= 100)forRef.money.ref_money += ghs * 0.05;

            forRef.save();
        }

        return res.status(201).json({ money: {
                GHS:      user.money.ghs,
                BITCOIN:  user.money.bitcoin,
                ETHEREUM: user.money.ethereum,
                LITECOIN: user.money.litecoin,
                USD:      user.money.usd,
                REF_MONEY:user.money.ref_money
            },
            message:  "Оплачено"
        });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//pay-out routes
//вывод денег через систему Qiwi
router.post('/pay-out/qiwi', [
    check('number', "Не корректный номер").isMobilePhone(['ru-RU', 'uk-UA', "en-US"]),
    check('RUB', "Не корректрая сумма").isNumeric()
],async (req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: "Некоректные данные"});
        }

        const { number, IP, RUB, rub } = req.body,
            user = await isAuth(req);

        if(!user)                         return res.status(401).json({ message: "Tокен не верен" });
        if(number === 0 || number === '') return res.status(201).json({ message: "Поле кошелька пустое" });
        if((+RUB / rub) > user.money.usd) return res.status(201).json({ message: "У вас нет данной суммы" });

        const pay = new Pay({
            userName:     user.userName,
            email:        user.email,
            system:       "Qiwi",
            number:       number,
            ip:           IP,
            money:        RUB,
            confirmation: "В обработке",
            date:         Date.now()
        });

        await pay.save();

        return res.status(201).json({message:  "Ждите подтверждения администратора"});
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//вывод денег через систему Payeer
router.post('/pay-out/payeer', [
    check('USD', "Не корректрая сумма").isNumeric()
],async (req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: "Некоректные данные"});
        }

        const { number, IP , USD } = req.body,
            user = await isAuth(req);

        if(!user)                                     return res.status(401).json({ message: "Tокен не верен" });
        if(!number || number === 0 || number === '')  return res.status(201).json({ message: "Поле кошелька пустое" });
        if(USD > user.money.usd)                      return res.status(201).json({ message: "У вас нет данной суммы" });

        const pay = new Pay({
            userName:     user.userName,
            email:        user.email,
            system:       "Payeer",
            number:       number,
            ip:           IP,
            money:        USD,
            confirmation: "В обработке",
            date:         Date.now()
        });

        await pay.save();

        return res.status(201).json({message:  "Ждите подтверждения администратора"});
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//вывод денег через систему Bitcoin
router.post('/pay-out/bitcoin', [
    check('BTC', "Не корректрая сумма").isNumeric()
],async (req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: "Некоректные данные"});
        }

        const { number, IP, BTC } = req.body,
            user = await isAuth(req);

        if(!user)                         return res.status(401).json({ message: "Tокен не верен" });
        if(number === null)               return res.status(201).json({ message: "Поле кошелька пустое" });
        if(BTC > user.money.bitcoin)      return res.status(201).json({ message: "У вас нет данной суммы" });

        const pay = new Pay({
            userName:     user.userName,
            email:        user.email,
            system:       "Bitcoin",
            number:       number,
            ip:           IP,
            money:        BTC,
            confirmation: "В обработке",
            date:         Date.now()
        });

        await pay.save();

        return res.status(201).json({message:  "Ждите подтверждения администратора"});
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//вывод денег через систему Litecoin
router.post('/pay-out/litecoin', [
    check('LTC', "Не корректрая сумма").isNumeric()
],async (req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: "Некоректные данные"});
        }

        const { number, IP, LTC } = req.body,
            user = await isAuth(req);

        if(!user)                         return res.status(401).json({ message: "Tокен не верен" });
        if(number === null)               return res.status(201).json({ message: "Поле кошелька пустое" });
        if(LTC > user.money.litecoin)     return res.status(201).json({ message: "У вас нет данной суммы" });


        const pay = new Pay({
            userName:     user.userName,
            email:        user.email,
            system:       "Litecoin",
            number:       number,
            ip:           IP,
            money:        LTC,
            confirmation: "В обработке",
            date:         Date.now()
        });

        await pay.save();

        return res.status(201).json({message: "Ждите подтверждения администратора"});
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//вывод денег через систему Ethereum
router.post('/pay-out/ethereum', [
    check('ETC', "Не корректрая сумма").isNumeric()
],async (req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(400).json({errors: errors.array(), message: "Некоректные данные"});

        const { number, IP, ETC } = req.body,
            user = await isAuth(req);

        if(!user)                         return res.status(401).json({ message: "Tокен не верен" });
        if(number === null)               return res.status(201).json({ message: "Поле кошелька пустое" });
        if(ETC > user.money.ethereum)     return res.status(201).json({ message: "У вас нет данной суммы" });

        const pay = new Pay({
            userName:     user.userName,
            email:        user.email,
            system:       "Ethereum",
            number:       number,
            ip:           IP,
            money:        ETC,
            confirmation: "В обработке",
            date:         Date.now()
        });

        await pay.save();

        return res.status(201).json({message:  "Ждите подтверждения администратора"});
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});


//одобрить заявку на вывод
router.post('/approve-badge' , async (req, res) => {
    try{
        const {candidate} = req.body,
            user = await isAuth(req);

        if(!user) return res.status(401).json({ message: "Tокен не верен" });

        const approvePayData = await Pay.findById(candidate._id),
            approveUserdata = await User.findOne({userName: approvePayData.userName, email: approvePayData.email});

        switch (approvePayData.system) {
            case "Bitcoin":
                if(approvePayData.confirmation === "В обработке"){
                    if(approveUserdata.money.bitcoin - approvePayData.money >= 0){
                        approveUserdata.money.bitcoin -= approvePayData.money;
                        approvePayData.confirmation = "Подтверждено";
                    } else {
                        approvePayData.confirmation = "Отклонено";
                    }
                } else {
                    return res.status(201).json({ message: "Данный платеж уже обработан" });
                }
                break;
            case "Litecoin":
                if(approvePayData.confirmation === "В обработке"){
                    if(approveUserdata.money.litecoin - approvePayData.money >= 0){
                        approveUserdata.money.litecoin -= approvePayData.money;
                        approvePayData.confirmation = "Подтверждено";
                    } else {
                        approvePayData.confirmation = "Отклонено";
                    }
                } else {
                    return res.status(201).json({ message: "Данный платеж уже обработан" });
                }
                break;
            case "Ethereum":
                if(approvePayData.confirmation === "В обработке"){
                    if(approveUserdata.money.ethereum - approvePayData.money >= 0){
                        approveUserdata.money.ethereum -= approvePayData.money;
                        approvePayData.confirmation = "Подтверждено";
                    } else {
                        approvePayData.confirmation = "Отклонено";
                    }
                } else {
                    return res.status(201).json({ message: "Данный платеж уже обработан" });
                }
                break;
            case "Payeer":
                if(approvePayData.confirmation === "В обработке"){
                    if(approveUserdata.money.usd - approvePayData.money >= 0){
                        approveUserdata.money.usd -= approvePayData.money;
                        approvePayData.confirmation = "Подтверждено";
                    } else {
                        approvePayData.confirmation = "Отклонено";
                    }
                } else {
                    return res.status(201).json({ message: "Данный платеж уже обработан" });
                }
                break;
            case "Qiwi":
                if(approvePayData.confirmation === "В обработке"){
                    if(approveUserdata.money.usd - approvePayData.money >= 0){
                        approveUserdata.money.usd -= approvePayData.money;
                        approvePayData.confirmation = "Подтверждено";
                    } else {
                        approvePayData.confirmation = "Отклонено";
                    }
                } else {
                    return res.status(201).json({ message: "Данный платеж уже обработан" });
                }
                break;
        }

        await approvePayData.save();
        await approveUserdata.save();

        res.status(201).json({ message: approvePayData.confirmation })
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});


//проверка не подтвержденных выплат
router.post('/pay-not-confirmation', async (req, res) => {
    try{
        const user = await isAuth(req);

        if(!user) return res.status(401).json({ message: "Tокен не верен" });

        const pay = await Pay.find({confirmation: "В обработке"});

        return res.status(201).json({ pay });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//отклонить заявку вывода
router.post('/reject-badge' , async (req, res) => {
    try{
        const {candidate} = req.body,
            user = await isAuth(req);

        if(!user) return res.status(401).json({ message: "Tокен не верен" });

        const rejectPayData = await Pay.findById(candidate._id);

        if(rejectPayData.confirmation === "В обработке"){
            rejectPayData.confirmation = "Отклонено";
            await rejectPayData.save();
            res.status(201).json({ message: "Отклонено" })
        } else {
            return res.status(201).json({ message: "Данный платеж уже обработан" });
        }

    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//поиск заявки по id
router.post('/search-pay' , async (req, res) => {
    try{
        const {searchParam} = req.body,
            user = await isAuth(req);

        if(!user) return res.status(401).json({ message: "Tокен не верен" });

        let searchPayData = await Pay.find(
            {
                $or: [
                    {userName: searchParam},
                    {email: searchParam}
                ]
            }
        );

        if(searchPayData.length === 0) {
            searchPayData = await Pay.findById(searchParam);
            return res.status(201).json({ searchPay: [searchPayData] })
        }

        return res.status(201).json({ searchPay: searchPayData })

    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//получить все заявки пользователя
router.post('/get-all-user-pay' , async (req, res) => {
    try{
        const user = await isAuth(req);

        if(!user) return res.status(401).json({ message: "Tокен не верен" });

        const payData = await Pay.find({userName: user.userName, email: user.email});

        res.status(201).json({ payData })
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//получить все заявки
router.post('/get-all-pay' , async (req, res) => {
    try{
        const user = await isAuth(req);

        if(!user) return res.status(401).json({ message: "Tокен не верен" });

        const payData = await Pay.find();

        res.status(201).json({ payData })
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//обмен намайненного на Gh/s
router.post('/exchange' , async (req, res) => {
    try{
        const {system, money, ghs} = req.body,
            user = await isAuth(req);

        if(!user) return res.status(401).json({ message: "Tокен не верен" });

        if(system && money && ghs){
            switch (system) {
                case "Ethereum":
                    user.money.ethereum -= money;
                    user.money.ghs += ghs;
                    break;
                case "Bitcoin":
                    user.money.bitcoin -= money;
                    user.money.ghs += ghs;
                    break;
                case "Litecoin":
                    user.money.litecoin -= money;
                    user.money.ghs += ghs;
                    break;
                case "USD":
                    user.money.usd -= money;
                    user.money.ghs += ghs;
                    break;
            }
            user.save()
            return res.status(201).json({ message: 'Обменяно' });
        }
        return res.status(201).json({ message: 'Не корректные данные' });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//последние 9 транзакций
router.post('/transaction' , async (req, res) => {
    try{
        const payOut = await Pay.find({confirmation: "Подтверждено"}).sort({date: -1}).limit(9),
            payIn = await Replenishment.find({}).sort({date: -1}).limit(9);

        return res.status(201).json({ payIn, payOut });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

module.exports = router;

