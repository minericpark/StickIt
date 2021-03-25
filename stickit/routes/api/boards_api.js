const express = require('express');
const boards = require('../db/Boards');
const router = express.Router();

// global to get a specific user board
const boardFilter = req => board => board.user_id == req.params.user_id && board.board_id == req.params.board_id;
/**
 * purpose: to see content of live server.
 * method: GET
 * response: 200 OK; 400 Error
*/
router.get('/allBoards', (req, res) => {
	res.status(200).json(boards);
});
/** 
 * purpose: to get every board of a specific user.
 * method: GET
 * endpoint: /boards
 * required parameters: user_id -> string
 * response: 200 OK; 400 Error
*/
router.get('/:user_id', (req, res) => {
	const found = boards.filter(board => board.user_id == req.params.user_id);
	if (found.length) return res.status(200).json(found);
	return res.status(400).json({ error: 'No boards were found for the user.' });
});
/** 
 * purpose: to create a new board.
 * method: POST
 * endpoint: /boards
 * required parameters: user_id -> string, title -> string
 * response: 200 OK; 400 Error
*/
router.post('/:user_id', (req, res) => {
	const new_board = {
		user_id : req.params.user_id,
		board_id : generateBoardID(req.params.user_id),
		title : req.body.title,
		status : "Active"
	}
	boards.push(new_board);
	return res.status(200).json(boards);
});
/**
 * purpose: to edit a board.
 * method: PATCH
 * endpoint: /boards/patch
 * required parameters: user_id -> string, board_id -> string, title -> string
 * response: 200 OK, 400 Error
*/
router.patch('/edit/:user_id/:board_id', (req, res) => {
	const found = boards.find(boardFilter(req));
	if (found) {
		Object.assign(found, req.body);
		return res.status(200).json({ msg : 'Board was successfully updated.'});
	}
	return res.status(400).json({ msg : 'Board could not be updated.' });
});
/**
 * purpose: changes a boards status. (ie. Trash -> Active)
 * method: PATCH
 * endpoint: /boards/active
 * required parameters: user_id -> string, board_id -> string
 * response: 200 OK, 400 Error
*/
router.patch('/activate/:user_id/:board_id', (req, res) => {
	const activate = { status : "Active" };
	const found = boards.find(boardFilter(req));
	if (found) {
		Object.assign(found, activate);
		// need to activate all stickies on board
		return res.status(200).json({ msg : 'Board was successfully made active.' });
	}
	return res.status(400).json({ error : 'Board could not be made active.' });
});
/**
 * purpose: changes a boards status. (ie. Active -> Trash)
 * method: PATCH
 * endpoint: /boards/trash
 * required parameters: user_id -> string, board_id -> string
 * response: 200 OK, 400 Error
*/
router.patch('/trash/:user_id/:board_id', (req, res) => {
	const trash = { status : "Trash" };
	const found = boards.find(boardFilter(req));
	if (found) {
		Object.assign(found, trash);
		// need to trash all stickies on board
		return res.status(200).json({ msg : 'Board was successfully placed in trash.' });
	}
	return res.status(400).json({ error : 'Board could not be moved to trash.' });
});
/**
 * purpose: PERMANENTLY DELETES a board.
 * method: DELETE
 * endpoint: /boards/delete
 * required parameters: user_id -> string, board_id -> string
 * response: 200 OK, 400 Error
*/
router.delete('/delete/:user_id/:board_id', (req, res) => {
	const found = boards.find(boardFilter(req));
	if (found) {
		boards.splice(boards.indexOf(found), 1);
		// need to delete all stickies on board
		return res.status(200).json({ msg : 'Board was successfully deleted.' });
	}
	return res.status(400).json({ error : 'Board could not be deleted.' });
});
/**
 * function to generate unique board_id's for each user
 * required parameters: user_id -> string
 * returns a unique board_id
*/
function generateBoardID(user_id) {
	const found = boards.filter(board => board.user_id == user_id);
	if (found.length) {
		const last_board_id = found[found.length-1].board_id;
		var new_board_id = last_board_id.split("_");
		new_board_id = 'board_' + (parseInt(new_board_id[1]) + 1);
		return new_board_id;
	}
	return 'board_1';
}

module.exports = router;
