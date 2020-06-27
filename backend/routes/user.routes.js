const { Router }                  = require('express'),
    User                          = require('../models/User');

const {isAuth} = require("../utils/auth.utils");

const router = Router();

//показать всех юзеров
router.get('/all', async (req, res) => {
    try{
        const users = await User.find();

        return res.status(201).json({ users });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//удалить юзера
router.delete('/remove', async (req, res) => {
    try{
        const { removeUser } = req.body,
            user = await isAuth(req);

        if(!user) return  res.status(401).json({ message: "Tокен не верен" });

        await User.updateMany({$pull: {'ref.ref_register':  removeUser._id}})
        await User.deleteOne({_id: removeUser._id});

        return res.status(201).json({ message: "Пользователь удален" });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//блокировать юзера
router.post('/block', async (req, res) => {
    try{
        const { blockUserId } = req.body,
            user = await isAuth(req);

        if(!user){
            return  res.status(401).json({ message: "Tокен не верен" });
        }

        const blockUserData = await User.findById(blockUserId);

        blockUserData.block = true;
        blockUserData.save();

        return res.status(201).json({ message: "Пользователь блокирован" });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//разблокировать юзера
router.post('/unblock', async (req, res) => {
    try{
        const { unblockUserId } = req.body,
            user = await isAuth(req);

        if(!user){
            return  res.status(401).json({ message: "Tокен не верен" });
        }

        const unblockUserData = await User.findById(unblockUserId);

        unblockUserData.block = false;
        unblockUserData.save();

        return res.status(201).json({ message: "Пользователь разблокирован" });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//проверка блокировки пользователя
router.post('/block_check', async (req, res) => {
    try{
        const user = await isAuth(req);

        if(!user){
            return  res.status(401).json({ message: "Tокен не верен" });
        }

        return res.status(201).json({ blocked: user.block });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//проверка на администратора пользователя
router.post('/is_admin_check', async (req, res) => {
    try{
        const user = await isAuth(req);

        if(!user){
            return  res.status(401).json({ message: "Tокен не верен" });
        }

        return res.status(201).json({ isAdmin: user.isAdmin });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//поиск пользователя по userName и email
router.post('/search', async (req, res) => {
    try{
        const { searchParam } = req.body,
            user = await isAuth(req);

        if(!user){
            return  res.status(401).json({ message: "Tокен не верен" });
        }

        const searchUser = await User.findOne({
            $or:
                [
                    {userName : searchParam},
                    {email    : searchParam}
                ]
        });

        return res.status(201).json({ searchUser });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//поиск пользователя по _id
router.post('/search_by_id', async (req, res) => {
    try{
        const { searchParam } = req.body,
            user = await isAuth(req);

        if(!user){
            return  res.status(401).json({ message: "Tокен не верен" });
        }

        const searchUser = await User.findById(searchParam);

        return res.status(201).json({ searchUser });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//добавление администаратора
router.post('/add_admin', async (req,res) => {
    try{
        const { addAdminUserId } = req.body,
            user = await isAuth(req);

        if(!user){
            return  res.status(401).json({ message: "Tокен не верен" });
        }

        const newAdminUser = await User.findById(addAdminUserId);

        newAdminUser.isAdmin = true;
        newAdminUser.save();

        return res.status(201).json({ message: "Новый администратор добавлен" });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//удаление администратора
router.post('/remove_admin', async (req,res) => {
    try{
        const { removeAdminUserId } = req.body,
            user = await isAuth(req);

        if(!user){
            return  res.status(401).json({ message: "Tокен не верен" });
        }

        const oldAdminUser = await User.findById(removeAdminUserId);

        oldAdminUser.isAdmin = false;
        oldAdminUser.save();

        return res.status(201).json({ message: "Этот пользователь больше не администратор" });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

//вывод всех рефералов пользователя
router.post('/search_all_ref', async (req,res) => {
    try{
        const { ref } = req.body,
            user = await isAuth(req);

        if(!user){
            return  res.status(401).json({ message: "Tокен не верен" });
        }

        const allUserRef = await User.find({
            _id: {
                $in: ref
            }
        });

        return res.status(201).json({ refUsers: allUserRef });
    } catch (e) {
        res.sendStatus(500).json({ message: e.message });
    }
});

module.exports = router;

