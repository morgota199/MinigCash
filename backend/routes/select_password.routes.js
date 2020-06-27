const { check, validationResult } = require('express-validator'),
    { Router }                  = require('express'),
    bcrypt                    = require('bcryptjs');

const {isAuth} = require("../utils/auth.utils");

const router = Router();

router.post('/profile/select-password', [
    check("oldPassword", "Минимальная длина пароля 6 символов").isLength({min: 6}),
    check("newPassword", "Минимальная длина пароля 6 символов").isLength({min: 6})
], async (req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: "Некоректные данные"});
        }

        const { newPassword, oldPassword} = req.body,
            user = await isAuth(req);

        if(!user){
            return  res.status(401).json({ message: "Tокен не верен" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if(!isMatch){
            return res.status(400).json({ message: "Неверный пароль"});
        }

        user.password = await bcrypt.hash(newPassword, 12);

        await user.save();

        return res.status(201).json({ message: "Пароль сменен" });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

module.exports = router;

