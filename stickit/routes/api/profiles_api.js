const express = require('express');
const profiles = require('../db/Profiles');

const router = express.Router();

const idFilter = req => profile => profile.user_id === parseInt(req.params.id);

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

router.patch('/:id', (req, res) => {
    const newFirstName = req.body.first_name;
    const newLastName = req.body.last_name;
    const foundProfile = profiles.find(idFilter(req));

    if (Object.keys(req.body).length === 0) return res.status(400).json({ msg: 'Please include a first or a last name' });
    if (!newFirstName && !newLastName) return res.status(400).json({ msg: 'Please include a valid first and/ or last name'});

    if (!foundProfile) return res.status(400).json({ msg: `No profile with the id of ${req.params.id}` });

    //This will be minimized into a function later if more properties are added to the profile object
    if (newFirstName) foundProfile.first_name = req.body.first_name;
    if (newLastName) foundProfile.last_name = req.body.last_name;
    res.status(200).json({
        status: 'SUCCESS',
        msg: 'Profile information updated'
    });
});

module.exports = router;