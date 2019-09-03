let express             = require('express');
let { USER_MODEL }      = require('../models/users.model');
let router              = express.Router();

router.get('/list', async (req, res) => {
    let listUsers = await USER_MODEL.find({});
    res.render('list-user', { listUsers })
});

router.route('/add')
    .get((req, res) => {
        res.render('add-user', { infoUser: undefined });
    })
    .post(async (req, res) => {
        const { fullname, age } = req.body;
        let infoUser = new USER_MODEL({ fullname, age });
        let infoSave = await infoUser.save();
        // console.log({ infoSave });
        // res.json({ infoSave })
        res.redirect('/user/list');
    });

router.get('/remove/:userID', async (req, res) => {
    const { userID } = req.params;
    let infoUserAfterRemove = await USER_MODEL.findByIdAndRemove(userID);
    // let infoUserAfterRemove = await USER_MODEL.findOneAndRemove({ _id: userID });
    console.log({ infoUserAfterRemove });
    res.redirect('/user/list');
});

router.route('/update/:userID')
    .get(async (req, res) => {
        const { userID } = req.params;
        let infoUser = await USER_MODEL.findOne({_id: userID});
        // let infoUser2 = await USER_MODEL.findById(userID)
        res.render('add-user', { infoUser });
    })
    .post(async (req, res) => {
        const { fullname, age } = req.body;
        const { userID } = req.params;

        let infoUserAfterUpdated = await USER_MODEL.findByIdAndUpdate(userID, {
            fullname, age
        });
        console.log({ infoUserAfterUpdated });
        res.redirect('/user/list');
    });

exports.USER_ROUTER = router;