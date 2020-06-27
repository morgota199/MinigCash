const { Router }                  = require('express'),
    Ticet                       = require('../models/Tikets');

const {isAuth} = require("../utils/auth.utils");

const router = Router();

//добавить новый тикет
router.post('/new-ticet', async (req, res) => {
    try{
        const { theme, question} = req.body.form,
            user = await isAuth(req);

        if(!user){
            return  res.status(401).json({ message: "Tокен не верен" });
        }


        const ticet = new Ticet({
            userName:     user.userName,
            email:        user.email,
            theme:        theme,
            question:     question,
            answer:       null,
            state:        "В обработке",
            date:         Date.now()
        });

        await ticet.save();

        return res.status(201).json({ message: "Отправлено" });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//показать тикеты юзера
router.post('/all-ticet', async (req, res) => {
    try{
        const user = await isAuth(req);

        if(!user){
            return  res.status(401).json({ message: "Tокен не верен" });
        }

        const ticet = await Ticet.find({userName: user.userName, email: user.email});

        return res.status(201).json({ ticet });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//показать все тикеты
router.post('/all-ticet-admin', async (req, res) => {
    try{
        const user = await isAuth(req);

        if(!user){
            return  res.status(401).json({ message: "Tокен не верен" });
        }

        const ticet = await Ticet.find();

        ticet.sort((a) => a.state === "В обработке" ? -1 : 1);

        return res.status(201).json({ ticet });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//обновить статус и ответ в тикете
router.post('/update-ticet', async (req, res) => {
    try{
        const user = await isAuth(req);

        if(!user){
            return  res.status(401).json({ message: "Tокен не верен" });
        }

        const { ticet, answer } = req.body;

        const ticetData = await Ticet.findOne({
            userName: ticet.userName,
            email:    ticet.email,
            theme:    ticet.theme,
            question: ticet.question,
            answer:   ticet.answer,
            state:    ticet.state,
            date:     ticet.date
        });

        ticetData.answer = answer;
        ticetData.state = "Обработано";

        if(answer === ""){
            ticetData.state = "В обработке";
        }

        ticetData.save();

        return res.status(201).json({ message: "Отправлено" });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//удалить тикет
router.post('/remove-ticet', async (req, res) => {
    try{
        const user = await isAuth(req);

        if(!user){
            return  res.status(401).json({ message: "Tокен не верен" });
        }

        const { candidate } = req.body;

        const ticetData = await Ticet.deleteOne({
            userName: candidate[0].userName,
            email:    candidate[0].email,
            theme:    candidate[0].theme,
            question: candidate[0].question,
            answer:   candidate[0].answer,
            state:    candidate[0].state,
            date:     candidate[0].date
        });

        ticetData.deletedCount;

        const ticet = await Ticet.find({});

        ticet.sort((a) => a.state === "В обработке" ? -1 : 1);

        return res.status(201).json({ ticet, message: "Удалено" });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

module.exports = router;

