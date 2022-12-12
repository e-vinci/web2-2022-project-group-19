const express = require('express');
// const { getSessionObject } = require('../../frontend/src/utils/session');
const router = express.Router();

const{
    vote,
    alreadyVoted,
    getAverageVotes, 

} = require('../models/vote');

// To submit a vote from a user
router.post('/submitVote', (req,res) =>{
    const newVote = vote(req.body);
    return res.json(newVote);

});

// To see if the user has already voted for the specified character
router.post('/alreadyVoted', (req,res) =>{

    const bool = alreadyVoted(req.body);
    return res.json(bool);
});

// Get average votes for a character
router.get('/getAverageVotes/:id', (req,res) =>{
    const averageVotes = getAverageVotes(req.params.id);
    return res.json(averageVotes);
});

module.exports = router;