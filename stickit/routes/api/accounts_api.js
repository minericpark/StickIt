const express = require('express');
const accounts = require('../db/Accounts');

const router = express.Router();

const idFilter = req => account => account.user_id === req.params.id;

// used to view accounts added during active session
router.get("/allAccounts", (req, res) => {
    res.status(200).json(accounts);
});

/**
 method: GET
 endpoint: /accounts/verify
 purpose: verifies whether an account using given email exists in database
 required parameters: email -> string
 response: 200 OK; 400 Error
 */
router.get("/verify", (req, res) => {
	const found = accounts.find(account => account.user_id == req.query.email);
	if (!found) {
		return res.status(400).json({ msg: `No account using email ${req.query.email}` });
	}
	return res.status(200).json(found.user_id);
});

/**
 * required fields: email -> string, password -> string
 * response: 200 OK; 400 Error 
 */
router.get("/login", (req, res) => {
	const found = accounts.find(account => account.user_id == req.query.email);
	if (!found || found.password != req.query.password) {
		return res.status(400).json({ error: 'Incorrect email or password.' });
	}
	return res.status(200).json(found);
});
/**
 * required fields: string, password -> string
 * response: 200 OK; 400 Error 
 */
router.post('/createUser', (req, res) => {
	const found = accounts.find(account => account.user_id == req.body.user_id);
	if (found) return res.status(400).json({ error: 'Email already exists.' });

	const newUser = {
		user_id: req.body.user_id,
		password: req.body.password
	};
    // saves during session
	accounts.push(newUser);
	res.status(200).json(newUser);
});

/*
method: PATCH
endpoint: /accounts/edit
required parameters: id -> string
request body: new_password
response: 200 OK; 400 Error
*/
router.patch('/edit/:id', (req, res) => {
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
