const express = require('express');
const accounts = require('../db/Accounts');

const router = express.Router();

const idFilter = req => account => account.user_id === parseInt(req.params.id);

router.patch('/:id', (req, res) => {
    const found = accounts.some(idFilter(req));
    const newPassword = req.body.new_password;

    if (!found) res.status(400).json({ msg: `No profile with the id of ${req.params.id}` });
    //Saves during session, but doesn't permanently save in the database?
    accounts.find(prop => prop.user_id === parseInt(req.params.id)).password = newPassword;
    res.status(200).json({
        status: 'SUCCESS',
        msg: 'User password updated'
    });
});


module.exports = router;