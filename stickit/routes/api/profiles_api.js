const express = require('express');
const profiles = require('../db/Profiles');

const router = express.Router();

const idFilter = req => profile => profile.user_id === req.params.id;

router.get('/:id', (req,res)=>{
    const found = profiles.some(idFilter(req));
    if (found) {
        res.json(profiles.filter(idFilter(req)));
      } else {
        res.status(400).json({ msg: `No profile with the id of ${req.params.id}` });
      }
});

router.post('/', (req, res) => {
    const profile = {
        user_id: profiles.length + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };

    if (!profile.first_name || !profile.last_name) {
        return res.status(400).json({ msg: 'Please include a first and last name' });
    }

    profiles.push(profile);
    res.json(profiles);
});

/*
method: PATCH
required parameters: id -> string
request body: any parameters
response: 200 OK; 400 Error

! Request body is not required. Endpoint can take in anything and patch over any given body parameters. Can also add
new fields from the given object into database. E.g. if you send a property "first_name" with a value, the "first_name"
property of the found profile will be replaced. If you send a new property with a value, that property and value will
be added into the database entry.
*/
router.patch('/:id', (req, res) => {
    const foundProfile = profiles.find(idFilter(req));

    if (!foundProfile) return res.status(400).json({ msg: `No profile with the id of ${req.params.id}` });

    Object.assign(foundProfile, req.body);

    res.status(200).json({
        status: 'SUCCESS',
        msg: 'Profile information updated'
    });
});

module.exports = router;