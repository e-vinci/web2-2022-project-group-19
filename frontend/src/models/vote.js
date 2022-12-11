// import { setSessionObject } from "../utils/session";

const submitVote = async (idcharacter, iduser, valuevote) => {
    if(!idcharacter || !iduser || !valuevote) return undefined; 
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify({
               idCharacter: idcharacter,
               idUser: iduser,
               value: valuevote 
            }),
            headers: {
                'Content-Type' : 'application/json',
            },
        };

        const response = await fetch('/api/votes/submitVote', options);
        
        if(!response.ok){
            throw new Error(`vote : fetch error : ${response.status} : ${response.statusText}`);
        }
        const vote = await response.json();
        return vote; 
    } catch (error) {
     console.error('submitVote::error:', error);   
     throw error;
    }
}

const alreadyVoted = async (idcharacter, iduser) => {
    if(!idcharacter || !iduser) return undefined;
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                idCharacter: idcharacter,
                idUser: iduser,
            }),
            headers: {
                'Content-Type' : 'application/json',
            }, 
        };

        const response = await fetch('/api/votes/alreadyVoted', options);
        
        if(!response.ok){
            throw new Error(`alreadyVoted : fetch error : ${response.status} : ${response.statusText}`);
        }

        const bool = await response.json();

        return bool; 

    } catch (error) {
        console.error('alreadyVoted::error:', error);   
        throw error; 
    }

}

const getAverageVotes = async (idCharacter) => {
    
    if(!idCharacter) return undefined;
    try {

        const response = await fetch(`/api/votes/getAverageVotes/${idCharacter}`);

        if(!response.ok){
            throw new Error(`getAverageVotes : fetch error : ${response.status} : ${response.statusText}`);
        }
        
        const averageVotes = await response.json();
        return averageVotes;

    } catch (error) {
        console.error('getAverageVotes::error', error);
        throw error;
    }   
}

// eslint-disable-next-line import/prefer-default-export
export {submitVote,alreadyVoted,getAverageVotes};