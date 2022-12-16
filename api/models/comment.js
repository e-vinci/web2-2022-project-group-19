/* eslint-disable radix */
/* eslint-disable no-plusplus */
const path = require('node:path');
const { parse, serialize } = require('../utils/json');
const { readOneUserFromID } = require('./users');

const jsonDbPath = path.join(__dirname, '/../data/comment.json');

// Post a comment
function postComment(data){
    const comments = parse(jsonDbPath);
    const likes = [];
    const newComment = {
        id: getNextId(),
        content: (data.comment),
        likes, 
        idCharacter: data.idCharacter,
        idUser: data.idUser,
    };
    comments.push(newComment);
    serialize(jsonDbPath,comments);
    return newComment;
}

// Get all comments on the character
function getComments(idCharacter){
    const db = parse(jsonDbPath);
    const comments = db.filter((value) => value.idCharacter === idCharacter);
    const arrayComments = [];
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
// Comment liked by user
function likeAComment(data){
    const comments = parse(jsonDbPath);
    const comment = comments.find((value) => value.id === parseInt(data.idComment));
    const {likes} = comment;
    likes.push(data.idUser);
    serialize(jsonDbPath,comments);

    return likes;
}

function getNextId(){
    const comments = parse(jsonDbPath);
    const lastItemIndex = comments?.length !== 0 ? comments.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = comments[lastItemIndex]?.id;
    const nextId = lastId + 1;

    return nextId;
}

function filterCommentsByLikes(idCharacter){
    const db = parse(jsonDbPath);
    const comments = db.filter((value) => value.idCharacter === idCharacter);
    comments.sort((a,b)=> b.likes - a.likes);
    
    const filteredComments = [];
    for(let i = 0; i < comments.length; i++){
        const commentAndUsername = {
            idComment: comments[i].id,
            comment: comments[i].content,
            likes: comments[i].likes,
            user: readOneUserFromID(comments[i].idUser),
        }
        filteredComments.push(commentAndUsername);
    }

    return filteredComments;
}
// User has alreadyLikeComment
function alreadyLikedComment(data){
    const db = parse(jsonDbPath);
    const comment = db.find((value) => value.id === parseInt(data.idComment));
    const {likes} = comment;
    const alreadyLiked = likes.find((value) => value === parseInt(data.idUser));
    if(alreadyLiked) return true;
    
    return false;
}
module.exports = {postComment,getComments, likeAComment, filterCommentsByLikes, alreadyLikedComment};
