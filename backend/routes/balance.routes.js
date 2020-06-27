const { Mining } = require("../utils/balance.utils"),
      { isAuth } = require("../utils/auth.utils"),
      { Router } = require('express');


const router = Router();

router.post('/on-balance', async (req, res) => {
    try{
        const user = await isAuth(req);

        if(!user) return  res.status(401).json({ message: "Tокен не верен" });

        return res.status(201).json({ money: user.money });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

router.post('/save-power', async (req, res) => {
    try{
        const user = await isAuth(req);

        if(!user){
            return  res.status(401).json({ message: "Tокен не верен" });
        }

        const { name, power } = req.body;

        user.power[name.toLowerCase()] = power;

        user.save();

        return res.status(201).json({ message: 'Обновлено' });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

router.post('/set-power', async (req, res) => {
    try{
        const user = await isAuth(req);

        if(!user){
            return  res.status(401).json({ message: "Tокен не верен" });
        }

        if(user.block){
            return res.status(403).json({ message: "Этот пользователь блокирован" });
        }

        return res.status(201).json({ power: user.power });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

router.post('/balance-automatic', async (req, res) => {
    try{
        const user = await isAuth(req);

        if(!user) return  res.status(401).json({ message: "Tокен не верен" });

        user.server = req.body.on;

        await user.save();

        return res.status(201).json({ message: "Обновлено" });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

module.exports = router;

