const express = require('express');

const router = express.Router();

const{
    postComment, 
    getComments,
    likeAComment,
    filterCommentsByLikes, 

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

router.get('/likeAComment/:id', (req,res) =>{
    const likeCount = likeAComment(req.params.id);
    return res.json(likeCount);
})

router.get('/filterCommentsByLikes/:id', (req,res) =>{
    const filteredComments = filterCommentsByLikes(req.params.id);
    return res.json(filteredComments);
})
module.exports = router;