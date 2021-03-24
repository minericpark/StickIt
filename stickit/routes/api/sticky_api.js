const express = require('express');
const sticky_notes = require('../db/Sticky_notes.js');

const router = express.Router();
const idFilter = req => sticky_note => sticky_note.user_id === (req.body.user_id || req.params.user_id) && sticky_note.board_id === (req.body.board_id || req.params.board_id);

var s_id = sticky_notes.length + 1;

/*
method: GET
endpoint: /sticky
required parameters: user_id -> string, board_id -> string
response: 200 OK; 400 Error
*/
router.get('/:user_id/:board_id', (req,res)=>{
    const found = sticky_notes.some(idFilter(req));
    if (found) {
        res.json(sticky_notes.filter(idFilter(req)));
    } else {
        res.status(400).json({ msg: `No record found for user_id of ${req.params.user_id} & board_id of ${req.params.board_id}` });
    }
});

/*
method: POST
endpoint: /sticky/create
required parameters: user_id, board_id, title, desc, type -> string
additional parameters: due_date, any other fields for "Advanced Sticky notes"
response: 200 OK; 400 Error
*/
router.post('/create', (req, res) => {
    const sticky_note = {
        user_id: req.body.user_id,
        board_id: req.body.board_id,
        sticky_id: "sticky_"+s_id,
        title: req.body.title,
        type: req.body.type,
        desc: req.body.desc,
        due_date: req.body.due_date
    };

    if (!sticky_note.title || !sticky_note.desc || !sticky_note.type) {
        return res.status(400).json({ msg: 'Please include a title, desc, type' });
    }
    
    sticky_notes.push(sticky_note);
    res.json(sticky_notes);
    s_id++;
});

module.exports = router;