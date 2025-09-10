const express = require('express');
const router = express.Router();

const {
    createTournament,
    getTournaments,
    getTournament,
    updateTournament,
    deleteTournament
} = require('../controllers/tournamentController')

router.post('/',createTournament);
router.get('/',getTournaments);
router.get('/:id',getTournament);
router.put('/:id',updateTournament);
router.delete('/:id',deleteTournament);

module.exports = router;