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
  

module.exports = router;