const path = require('node:path');
const { parse, serialize } = require('../utils/json');
const { readOneUserFromID } = require('./users');

const jsonDbPath = path.join(__dirname, '/../data/comment.json');

// Post a comment
function postComment(data){
    const comments = parse(jsonDbPath);
    const reply = [];
    const newComment = {
        id: getNextId(),
        content: (data.comment),
        replies: reply,
        likes: 0, 
        idCharacter: data.idCharacter,
        idUser: data.idUser,
    };
    comments.push(newComment);
    serialize(jsonDbPath,comments);
    console.log("Comments: ", comments);
    return newComment;
}

// Get all comments on the character
function getComments(idCharacter){
    const db = parse(jsonDbPath);
    const comments = db.filter((value) => value.idCharacter === idCharacter);
    const arrayComments = [];
    // eslint-disable-next-line no-plusplus
    for(let i = 0; i < comments.length; i++){
        const commentAndUsername = {
            idComment: comments[i].id,
            comment: comments[i].content,
            likes: comments[i].likes,
            user: readOneUserFromID(comments[i].idUser),
        }
        arrayComments.push(commentAndUsername);
    }
    return arrayComments;
}
// To like a comment
function likeAComment(idComment){
    const comments = parse(jsonDbPath);
    // eslint-disable-next-line radix
    const comment= comments.find((value) => value.id === parseInt(idComment));
    comment.likes += 1;
    console.log("Likes: ", comment.likes);
    serialize(jsonDbPath,comments)
    return comment.likes;
}

function getNextId(){
    const comments = parse(jsonDbPath);
    const lastItemIndex = comments?.length !== 0 ? comments.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = comments[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
}


module.exports = {postComment,getComments, likeAComment};
