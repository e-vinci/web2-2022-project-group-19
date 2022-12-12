const express = require('express');

const router = express.Router();

const{
    postComment, 
    getComments, 

} = require('../models/comment');

// Post a comment
router.post('/postComment', (req,res)=>{
    const comment = postComment(req.body);
    return res.json(comment);
});

// Get all comments to a character
router.get('/getComments/:id', (req,res) =>{
    const comments = getComments(req.params.id);
    return res.json(comments);
})

module.exports = router;