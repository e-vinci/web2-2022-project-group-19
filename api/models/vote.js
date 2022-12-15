/* eslint-disable radix */
const { join } = require('node:path');
const path = require('node:path');
const { escape } = require('node:querystring');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/vote.json');

function getAllVotes(){
    const allVotes = parse(jsonDbPath);
    return allVotes;
}

function vote(data){
    const votes = parse(jsonDbPath);
    const newVote = {
        id: join(escape(data.idCharacter),escape(data.idUser)),
        idCharacter: escape(data.idCharacter),
        idUser: escape(data.idUser),
        value: escape(data.value),
    };

    votes.push(newVote);
    serialize(jsonDbPath,votes);
    return newVote;

}

function alreadyVoted(data){

    const votes = parse(jsonDbPath);
    const id = data.idCharacter.concat("\\",data.idUser);
    const voted = votes.find((value) => value.id === id);
    if(voted) return true;
    return false;

}

function getAverageVotes(idCharacter){
    const db = parse(jsonDbPath);
    const votes = db.filter((value) => value.idCharacter === idCharacter);
    const nbDeVotes = votes.length;
    if(nbDeVotes === 0) return 0;
    let totalVoteValue=0;
    // eslint-disable-next-line no-plusplus
    for(let i = 0; i < nbDeVotes; i++){
        totalVoteValue += parseInt(votes[i].value);
    }
    return totalVoteValue/votes.length;
}

module.exports = {
    getAllVotes,
    vote,
    alreadyVoted,
    getAverageVotes,
}