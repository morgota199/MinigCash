const { Router }              = require('express'),
    User                      = require('../models/User'),
    Replenishment             = require('../models/Replenishment');

const router = Router();

const {isAuth} = require("../utils/auth.utils");

router.post('/', async (req, res) => {
    try{
        if(!req.body.ref) return res.sendStatus(400).json({message: "Реферала нет"});

        const linkRef = await User.findOne({_id: req.body.ref});

        linkRef.ref.ref_show += 1;

        await linkRef.save();

        res.status(200).json({message: "Реферал добавлен"});
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

//реферал
router.post('/get-user-referral', async (req, res) => {
    try{
        const user =  await isAuth(req);

        if(!user) return res.status(401).json({ message: "Tокен не верен" });

        res.status(200).json({ref: user.ref});
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

//поиск дочерних рефералов по _id
router.post('/get-referrals-by-id', async (req, res) => {
    try{
        const user = await isAuth(req);

        if(!user) return res.status(401).json({ message: "Tокен не верен" });

        const referrals = await User.find({
            '_id' : {
                $in : user.ref.ref_register
            }
        });

        return res.status(200).json({referrals});
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})

//получить платежи реферала
router.post('/get-referrals-pay-by-id', async (req, res) => {
    try{
        const {ID} = req.body,
            user = await isAuth(req);

        if(!user) return res.status(401).json({ message: "Tокен не верен" });

        const pay = await Replenishment.find({userId: ID});

        return res.status(200).json({pay});
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})

//получить количество платежей реферала
router.post('/get-referrals-pay-length-by-id', async (req, res) => {
    try{
        const {ID} = req.body,
            user = await isAuth(req);

        if(!user) return res.status(401).json({ message: "Tокен не верен" });

        const pay = await Replenishment.find({userId: ID});

        return res.status(200).json({payCount: pay.length});
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})

//получить количество рефералов юзера
router.post('/get-referrals-length', async (req, res) => {
    try{
        const user = await isAuth(req);

        if(!user) return res.status(401).json({ message: "Tокен не верен" });

        return res.status(200).json({refLength: user.ref.ref_register.length});
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})

module.exports = router;

