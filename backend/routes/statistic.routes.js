const { Router }    = require('express'),
    Pay             = require('../models/Pay')

const {isAuth} = require("../utils/auth.utils");


const router = Router();

router.post('/statistic', async (req, res) => {
    try{
        const {start, end} = req.body,
            user = await isAuth(req);

        if(!user) return  res.status(401).json({ message: "Tокен не верен" });

        const pay = await Pay.find()

        console.log("Pay: ", pay)
        console.log("Start: ", start)
        console.log("End: ", end)

        return res.status(201).json({ message: "Пользователь создан" });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});


module.exports = router;

