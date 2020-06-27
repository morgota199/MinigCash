const { Router }                    = require('express'),
    News                            = require('../models/News');

const router = Router();

const {isAuth} = require("../utils/auth.utils");

//получить новости для админа
router.post('/get-news-admin', async (req, res) => {
    try{
        const user = isAuth(req);

        if(!user) return res.status(401).json({ message: "Tокен не верен" });

        const news = await News.find({});

        res.status(200).json(news);
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//получить новости для незарегестрированного пользователя
router.post('/get-news', async (req, res) => {
    try{
        const news = await News.find();

        res.status(200).json(news);
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//новая новость
router.post('/set-news-admin', async (req, res) => {
    try{
        const {news} = req.body,
            user = isAuth(req);

        if(!user) return res.status(401).json({ message: "Tокен не верен" });

        const newNews = new News({
            title: news.title,
            text : news.text
        });

        newNews.save();

        res.status(200).json({newNews, message: "Новость добавлена"});
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//удалить новость
router.post('/remove-news-admin', async (req, res) => {
    try{
        const {news} = req.body,
            user = isAuth(req);

        if(!user) return res.status(401).json({ message: "Tокен не верен" });

         await News.deleteOne({
            title: news.title,
            text : news.text
        });

        res.status(200).json({message: "Новость удалена"});
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//обновить новость
router.post('/update-news-admin', async (req, res) => {
    try{
        const {news} = req.body,
            user = isAuth(req);

        if(!user) return res.status(401).json({ message: "Tокен не верен" });

        const updateNews = await News.findById(news._id);

        updateNews.title = news.title;
        updateNews.text  = news.text;

        updateNews.save();

        res.status(200).json({message: "Новость сохранена"});
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});
module.exports = router;

