const { check, validationResult } = require('express-validator'),
    { Router }                    = require('express'),
    { Mining }                    = require("../utils/balance.utils"),
    jwt                           = require('jsonwebtoken'),
    bcrypt                        = require('bcryptjs'),
    config                        = require('config'),
    User                          = require('../models/User'),
    mailer                        = require('../utils/mailer.utils');


const router = Router();

router.post('/register', [
    check("email", "Некоректный email").isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({min: 6})
], async (req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(400).json({errors: errors.array(), message: "Некоректные данные"});

        const { userName, email, password, ref } = req.body,
            candidateForName = await User.findOne({userName}),
            candidateForEmail = await User.findOne({email});

        if(candidateForName || candidateForEmail) return res.status(400).json({message: "Такой пользователь уже существует"});

        const heshedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            userName,
            email,
            password: heshedPassword,
            passwordRecoveryCode: null,
            isAdmin: false,
            forRef: null,
            block: false,
            power: {
                litecoin: 0,
                usd: 0,
                ethereum: 0,
                bitcoin: 0,
            },
            money: {
                ghs: 1,
                litecoin: 0,
                usd: 0,
                ethereum: 0,
                bitcoin: 0,
                ref_money: 0
            },
            ref: {
                ref_show: 0,
                ref_register: []
            }
        });

        await user.save();

        Mining(user);

        if(!ref.ref) return res.status(201).json({ message: "Пользователь создан" });

        const refLink = await User.findOne({_id: ref.ref});

        if(!refLink) return res.status(201).json({ message: "Пользователь создан" });

        refLink.ref.ref_register.push(user.id);
        user.forRef = ref.ref;

        await refLink.save();
        await user.save();

        return res.status(201).json({ message: "Пользователь создан" });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

router.post('/login', [
    check("email", "Некоректный email").normalizeEmail().isEmail(),
    check("password", "Введите пароль").exists()
], async (req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(400).json({errors: errors.array(), message: "Некоректные данные"});

        const { userName, email, password } = req.body,
            user = await User.findOne({ userName, email });

        if(!user) return res.status(400).json({ message: "Такой пользователь не существует" });
        if(user.block) return res.status(403).json({ message: "Этот пользователь блокирован" });

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(400).json({ message: "Неверный пароль"});

        const token = await jwt.sign({userId: user.id, userName: user.userName, email: user.email}, config.get("HESHER"), { expiresIn: '1h' });

        return res.json({ token, userId: user.id, userName, admin: user.isAdmin, forRef: user.forRef });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


router.post('/password-recovery-code', async (req, res) => {
    try{
        const {recovery} = req.body;

        const user = await User.findOne({$or: [{userName: recovery}, {email: recovery}] })

        if(!user) return res.status(400).json({ message: "Такой пользователь не существует" });

        user.passwordRecoveryCode = await bcrypt.hash(user.password, 12);

        await mailer({
            to: user.email,
            subject: "Код для восстановления пароля на сайте",
            html: `
            <div>
                 <h1>Восстановление пароля</h1>
                 <br>
                 <p>Никому не разглашайте данный пароль!</p>
                 <p>Вставьте пароль в соотведствующее поле:  <b>${user.passwordRecoveryCode}</b></p>
                 <br>
                 <p>Данное письмо не требует ответа</p>
            </div>
            `
        })

        await user.save();

        return res.status(201);
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
})

router.post("/select-recovery-password", [
    check("one", "Минимальная длина пароля 6 символов").isLength({min: 6}),
], async (req, res) => {
    try{
        const {code, recovery, one} = req.body;

        const user = await User.findOne({$or: [{userName: recovery}, {email: recovery}] })

        if(!user) return res.status(400).json({ message: "Такой пользователь не существует" });

        const isMatch = (code === user.passwordRecoveryCode);

        if(!isMatch) return res.status(400).json({ message: "Неверный код"});

        const heshedPassword = await bcrypt.hash(one, 12);

        user.passwordRecoveryCode = null;
        user.password = heshedPassword;

        await user.save();

        return res.status(201).json({message: "Восстановлено"});
    }catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
})

module.exports = router;

