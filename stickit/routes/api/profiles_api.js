const express = require('express');
const profiles = require('../db/Profiles');

const router = express.Router();

const idFilter = req => profile => profile.user_id === req.params.id;

// used to view profiles added during active session
router.get("/allProfiles", (req, res) => {
    res.status(200).json(profiles);
});

/*
method: GET
endpoint: /profiles
required parameters: id -> string
response: 200 OK; 400 Error
*/
router.get('/:id', (req,res)=>{
    const found = profiles.some(idFilter(req));
    if (found) {
        res.json(profiles.filter(idFilter(req)));
      } else {
        res.status(400).json({ msg: `No profile with the id of ${req.params.id}` });
      }
});

/*
method: POST
endpoint: /profiles/create
required parameters: none
request body: user_id, first_name, last_name
response: 200 OK; 400 Error
*/
router.post('/create', (req, res) => {
    const profile = {
        user_id: req.body.user_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };

    if (!profile.first_name || !profile.last_name || !profile.user_id) {
        return res.status(400).json({ msg: 'Please include a user_id, first name, last name' });
    }

    profiles.push(profile);
    res.json(profiles);
});

/*
method: PATCH
endpoint: /profiles/edit
required parameters: id -> string
request body: any parameters
response: 200 OK; 400 Error

! Request body is not required. Endpoint can take in anything and patch over any given body parameters. Can also add
new fields from the given object into database. E.g. if you send a property "first_name" with a value, the "first_name"
property of the found profile will be replaced. If you send a new property with a value, that property and value will
be added into the database entry.
*/
router.patch('/edit/:id', (req, res) => {
    const foundProfile = profiles.find(idFilter(req));

    if (!foundProfile) return res.status(400).json({ msg: `No profile with the id of ${req.params.id}` });

    Object.assign(foundProfile, req.body);

    res.status(200).json({
        status: 'SUCCESS',
        msg: 'Profile information updated'
    });
});

module.exports = router;