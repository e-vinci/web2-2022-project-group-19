const postComment = async (idcharacter,iduser,commentValue) => {

    if(!idcharacter || !iduser || !commentValue) return undefined;
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                idCharacter: idcharacter,
                idUser: iduser,
                comment: commentValue
            }),
            headers: {
                'Content-Type' : 'application/json',
            },
        };
        console.log("Inside comment: ", idcharacter,iduser,commentValue);
        const response = await fetch('/api/comments/postComment', options);
        
        if(!response.ok){
            throw new Error(`postComment : fetch error : ${response.status} : ${response.statusText}`);
        }

        const comment = await response.json();
        console.log("Comment json:", comment);
        return comment; 
    } catch (error) {
        console.error('postComment::error:', error);   
        throw error;
    }
}

const getComments = async (idCharacter)=>{
        
    if(!idCharacter) return undefined;
    try {

        const response = await fetch(`/api/comments/getComments/${idCharacter}`);

        if(!response.ok){
            throw new Error(`getComments : fetch error : ${response.status} : ${response.statusText}`);
        }
        
        const comments = await response.json();
        return comments;

    } catch (error) {
        console.error('getComments::error', error);
        throw error;
    }  
}


// eslint-disable-next-line import/prefer-default-export
export {postComment,getComments};