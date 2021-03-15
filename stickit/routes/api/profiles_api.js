const express = require('express');
const profiles = require('../db/Profiles');

const router = express.Router();

const idFilter = req => profile => profile.user_id === req.params.id;

/*
method: GET
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
required parameters: none
request body: user_id, first_name, last_name
response: 200 OK; 400 Error
*/
router.post('/', (req, res) => {
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

/**
 * Consider optimizing this patch request later, so request would read the body properties
 * and either replace or add them into the object in DB without using the object schema
 */
router.patch('/:id', (req, res) => {
    const newFirstName = req.body.first_name;
    const newLastName = req.body.last_name;
    const foundProfile = profiles.find(idFilter(req));

    if (!foundProfile) return res.status(400).json({ msg: `No profile with the id of ${req.params.id}` });

    if (newFirstName) foundProfile.first_name = req.body.first_name;
    if (newLastName) foundProfile.last_name = req.body.last_name;
    res.status(200).json({
        status: 'SUCCESS',
        msg: 'Profile information updated'
    });
});

module.exports = router;