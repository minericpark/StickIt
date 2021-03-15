const express = require('express');
const accounts = require('../db/Accounts');

const router = express.Router();

const idFilter = req => account => account.user_id === parseInt(req.params.id);

router.patch('/:id', (req, res) => {
    const foundAccount = accounts.find(idFilter(req));
    const newPassword = req.body.new_password;

    if (!foundAccount) return res.status(400).json({ msg: `No profile with the id of ${req.params.id}` });

    foundAccount.password = newPassword;

    res.status(200).json({
        status: 'SUCCESS',
        msg: 'User password updated'
    });
});


module.exports = router;
