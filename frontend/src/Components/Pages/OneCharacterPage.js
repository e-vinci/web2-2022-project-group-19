/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import { getSessionObject, removeSessionObject, setSessionObject } from '../../utils/session';
import { readOneCharacter, readAllCharacters } from '../../models/character';
import { alreadyVoted, getAverageVotes, submitVote } from '../../models/vote';
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';
import { filterCommentsByLikes, getComments, likeAComment, postComment } from '../../models/comment';


const OneCharacterPage = async () => {
  clearPage();
  Navbar();

  const main = document.querySelector('main');
  // recover the id character by clicking on the button
  const idCharacter = getSessionObject("id");
  const character = await readOneCharacter(idCharacter);
  const connectedUser = await getAuthenticatedUser();
  // delete from session storage to clean
  removeSessionObject("id");

  
  const displayCharacter = `
  <img src="${character.images.md}"/>
  <p><b>Character ID : ${idCharacter} </b></p>
  <p><b>Character name : ${character.name} </b></p>
  `
  const filteredComments = await filterCommentsByLikes(idCharacter);
  console.log("Filtered Comments : ", filteredComments);
  let averageVotes = await getAverageVotes(idCharacter);
  if(averageVotes === 0){
    averageVotes = "No one has voted for this character yet";
  }
  let arrayComments = await getComments(idCharacter);
  let comments=`
    <p><b>Comments :</b></p>
  `;
  if(arrayComments.length === 0){
    comments+=`
    <p><b>No comments yet. </b></p>
    `
  }else{
    arrayComments = filteredComments;
    for(let i = 0; i<arrayComments.length; i++){
      comments+=`
      <p>
        <b>${arrayComments[i].iduser} : </b>
        <b>${arrayComments[i].id} : </b>
        <a>${arrayComments[i].content}</a>  
        <button id="likeACommentButton" class="btn btn-primary" data-value="${arrayComments[i].id}">Like</button>
        <a>Likes: ${arrayComments[i].likes}</a>
      </p>
      `
    }
  }

  const characterEvaluation = `
  <p>
    <b>Average vote for this character: ${averageVotes}</b>
  </p>
  `;

  let voteForm = ``;

  let commentForm=`
    <div class="mb-3">
      <textarea class="form-control" id="commentForm" rows="3" placeholder="Write down your comment here"></textarea>
      <button id="commentButton" class="btn btn-primary">Post</button>
    </div>
  `;

  let idUser;
  let UserAlreadyVoted;
  const connected = isAuthenticated();

  if(connected){
    idUser = getSessionObject("idUser");
    UserAlreadyVoted = await alreadyVoted(idCharacter,idUser);
  }

  
  if(!connected){
    voteForm = `
      <p>
        <b>Only connected users are allowed to vote for Characters, please login.</b>
      </p>
    `;
    commentForm =`
    <p>
      <b>Only connected users are allowed to comment, please login.</b>
    </p>
    `;
  }
  else if(UserAlreadyVoted) {
    voteForm = `
    <p>
      <b>You have already voted for this character.</b>
    </p>
    `;
  }
  else{
    voteForm = `
    <p><b>How would you rate ${character.name} ? </b></p>
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
      <div class="btn-group me-2" role="group" aria-label="First group">
      <button id="voteButton" class="btn btn-primary" data-value=1>1</button>
      <button id="voteButton" class="btn btn-primary" data-value=2>2</button>
      <button id="voteButton" class="btn btn-primary" data-value=3>3</button>
      <button id="voteButton" class="btn btn-primary" data-value=4>4</button>
      <button id="voteButton" class="btn btn-primary" data-value=5>5</button>
      </div>
    </div>
    `;

  }


  comments += commentForm;

  main.innerHTML = displayCharacter + characterEvaluation + voteForm + comments;

  const voteButton = document.querySelectorAll("#voteButton");

  for (let i = 0; i < voteButton.length; i++){
    const btn = voteButton[i];
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const buttonClicked = e.target;
      const {value} = buttonClicked.dataset;
      if(value){
        const submited  = submitVote(idCharacter,idUser,value);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      }
    });
  }

  const commentButton = document.querySelector("#commentButton");

  if(commentButton){
    commentButton.addEventListener('click', (e) => {
      e.preventDefault();
      const comment = document.getElementById("commentForm");
      postComment(idCharacter,idUser,comment.value);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    })
  }
  const likeACommentButton = document.querySelectorAll("#likeACommentButton");

  for(let i = 0; i<likeACommentButton.length; i++){
    const btn = likeACommentButton[i];
    btn.addEventListener('click', (e)=> {
      e.preventDefault();
      const buttonClicked = e.target;
      const idComment = buttonClicked.dataset.value;
      console.log("Id comment :", idComment);
      if(idComment){
        console.log("Inside like");
        likeAComment(idComment);
      }
    })
  }

};

export default OneCharacterPage;
