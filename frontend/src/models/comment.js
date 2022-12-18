const postComment = async (idcharacter, iduser, commentValue) => {

    if (!idcharacter || !iduser || !commentValue) return undefined;
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                idCharacter: idcharacter,
                idUser: iduser,
                comment: commentValue
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch('/api/comments/postComment', options);

        if (!response.ok) {
            throw new Error(`postComment : fetch error : ${response.status} : ${response.statusText}`);
        }

        const comment = await response.json();
        return comment;
    } catch (error) {
        console.error('postComment::error:', error);
        throw error;
    }
}

const getComments = async (idCharacter) => {

    if (!idCharacter) return undefined;
    try {

        const response = await fetch(`/api/comments/getComments/${idCharacter}`);

        if (!response.ok) {
            throw new Error(`getComments : fetch error : ${response.status} : ${response.statusText}`);
        }

        const comments = await response.json();
        return comments;

    } catch (error) {
        console.error('getComments::error', error);
        throw error;
    }
}

const likeAComment = async (idcomment, iduser) => {
    if (!idcomment || !iduser) return undefined;
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                idComment: idcomment,
                idUser: iduser,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(`/api/comments/likeAComment`, options);

        if (!response.ok) {
            throw new Error(`likeAComment : fetch error : ${response.status} : ${response.statusText}`);
        }

        const comments = await response.json();
        return comments;

    } catch (error) {
        console.error('likeAComment::error', error);
        throw error;
    }
}

const filterCommentsByLikes = async (idCharacter) => {
    if (!idCharacter) return undefined;
    try {

        const response = await fetch(`/api/comments/filterCommentsByLikes/${idCharacter}`);

        if (!response.ok) {
            throw new Error(`likeAComment : fetch error : ${response.status} : ${response.statusText}`);
        }

        const comments = await response.json();
        return comments;

    } catch (error) {
        console.error('likeAComment::error', error);
        throw error;
    }
}

const alreadyLikedComment = async (idcomment, iduser) => {
    if (!idcomment || !iduser) return undefined;
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                idComment: idcomment,
                idUser: iduser,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(`${process.env.API_BASE_URL}/comments/alreadyLikedComment`, options);

        if (!response.ok) {
            throw new Error(`alreadyLikedComment : fetch error : ${response.status} : ${response.statusText}`);
        }

        const boolean = await response.json();
        return boolean;

    } catch (error) {
        console.error('alreadyLikedComment::error', error);
        throw error;
    }
}


// eslint-disable-next-line import/prefer-default-export
export { postComment, getComments, likeAComment, filterCommentsByLikes, alreadyLikedComment };