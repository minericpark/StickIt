const express = require('express');
const boards = require('../db/Boards');
const router = express.Router();

// global to get a specific user board
const boardFilter = req => board => board.user_id == req.params.user_id && board.board_id == req.params.board_id;

/**
 * purpose: to see content of live server.
 * method: GET
 * response: 200 OK
*/
router.get('/allBoards', (req, res) => {
	res.status(200).json(boards);
});
/**
 * endpoint: /boards
 * required parameters: user_id -> string
 * response: 200 OK, 400 Error
*/
router.route('/:user_id')
// purpose: to get every board of a specific user.
.get((req, res) => {
	const found = boards.filter(board => board.user_id == req.params.user_id);
	if (found.length) return res.status(200).json(found);
	return res.status(400).json({ error: 'No boards were found for the user.' });
})
// purpose: to create a new board.
.post((req, res) => {
	const new_board = {
		user_id : req.params.user_id,
		board_id : generateBoardID(req.params.user_id),
		title : req.body.title,
		status : true
	}
	boards.push(new_board);
	return res.status(200).json({ msg: 'New board has been created.' });
});
/**
 * endpoint: /boards
 * required parameters: user_id -> string, board_id -> string
 * response: 200 OK, 400 Error
 */
router.route('/:user_id/:board_id')
// purpose: to edit and add parameters to a specific users board (ie. update a board).
.put((req, res) => {
	const found = boards.find(boardFilter(req));
	if (found) {
		Object.assign(found, req.body);
		return res.status(200).json({ msg : 'Board was successfully updated.' });
	}
	return res.status(400).json({ msg : 'Board could not be updated.' });
})
// purpose: changes a boards status (ie. Trash -> Active).
.patch((req, res) => {
	const found = boards.find(boardFilter(req));
	if (found) {
		changeBoardStatus(found);
		return res.status(200).json({ msg : 'Boards status was successfully changed.' });
	}
	return res.status(400).json({ error : 'Boards status could not be changed.' });
});
/**
 * endpoint: /boards/delete
 * required parameters: user_id -> string, board_id -> string
 * response: 200 OK, 400 Error
*/
router.route('/delete/:user_id/:board_id')
// purpose: PERMANENTLY DELETES a board.
.delete((req, res) => {
	const found = boards.find(boardFilter(req));
	if (found) {
		DELETE_A_BOARD(found);
		return res.status(200).json({ msg : 'Board was successfully deleted.' });
	}
	return res.status(400).json({ error : 'Board could not be deleted.' });
});


/**
 * function to generate unique board_id's for each user.
 * param: user_id -> string
 * return: a unique board_id
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
/**
 * function to change the bool status of a board.
*/
function changeBoardStatus(boardToChange) {
	boardToChange.status = !boardToChange.status;
	// changeStickyStatus
}
/**
 * function to PERMANENTLY DELETE A BOARD and ALL STICKIES ON IT.
 * param: boardToDELETE -> object
*/
function DELETE_A_BOARD(boardToDELETE) {
	boards.splice(boards.indexOf(boardToDELETE), 1);
	// DELETE_STICKIES_ON_BOARD
}

module.exports = router;
