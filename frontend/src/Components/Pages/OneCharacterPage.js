/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-loop-func */ 
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import { getSessionObject, removeSessionObject, setSessionObject } from '../../utils/session';
import { readOneCharacter, readAllCharacters } from '../../models/character';
import { alreadyVoted, getAverageVotes, submitVote } from '../../models/vote';
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';
import { alreadyLikedComment, filterCommentsByLikes, getComments, likeAComment, postComment } from '../../models/comment';

const Swal = require('sweetalert2')


const OneCharacterPage = async () => {
  clearPage();
  Navbar();

  const main = document.querySelector('main');
  // recover the id character by clicking on the button
  const idCharacter = localStorage.getItem("idCharacter");
  const character = await readOneCharacter(idCharacter);
  // console.log(idCharacter);
  const likeIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
      <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
    </svg>
  `
  let averageVotes = await getAverageVotes(idCharacter);
  if (averageVotes === 0) {
    averageVotes = "No one has voted for this character yet";
  }
  const arrayComments = await filterCommentsByLikes(idCharacter);
  let comments = `
    <p><b>Comments :</b></p>
  `;
  if (arrayComments.length === 0) {
    comments += `
    <p><b>No comments yet. </b></p>
    `
  } else {
    for (let i = 0; i < arrayComments.length; i++) {

      comments += `
      
      <div class="card-body p-4">
      <div class="d-flex flex-start">
        <div>
          <h6 class="fw-bold mb-1">${arrayComments[i].user}</h6>
          <div class="d-flex align-items-center mb-3">
          <button id="likeACommentButton" class="btn btn-primary" data-value="${arrayComments[i].idComment}" >${likeIcon}</button>
          <a>${arrayComments[i].likes.length}</a>
          </div>
          <p class="mb-0">${arrayComments[i].comment}</p>
        </div>
      </div>
    </div>
      `;
      if (i < arrayComments.length - 1) comments += `<hr class="my-0" />`
    }
  }


  let voteForm = ``;

  let commentForm = `
    <div class="mb-3">
      <textarea class="form-control" id="commentForm" rows="3" placeholder="Write down your comment here"></textarea>
      <button id="commentButton" class="btn btn-primary">Post</button>
    </div>
  `;

  let idUser;
  let UserAlreadyVoted;
  const connected = isAuthenticated();

  if (connected) {
    idUser = getSessionObject("idUser");
    UserAlreadyVoted = await alreadyVoted(idCharacter, idUser);
  }

  if (!connected) {
    voteForm = `
      <p>
        <b>Only connected users are allowed to vote for Characters, please login.</b>
      </p>
    `;
    commentForm = `
    <p>
      <b>Only connected users are allowed to comment, please login.</b>
    </p>
    `;
  }
  else if (UserAlreadyVoted) {
    voteForm = `
    <p>
      <b>You have already voted for this character.</b>
    </p>
    `;
  }
  else {
    voteForm = `
    <p><b>What would you rate ${character.name} ? </b></p>
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

  const displayCharacter = `
  <div class="card text-dark bg-info mb-3" style="width: 80%;">
    <div class="row no-gutters">
      <div class="col-sm-4">
          <img class="card-img" src="${character?.images?.md}" alt="characterImage">
      </div>
      <div class="col-sm-7">
      <div class="container">
      <div class="row">
        <div class="col-sm-8">
          <div class="card-body">
          <h3 class="card-title">${character?.name}</h3>
            <div class="card-text">
              <p><b>Full name: </b>${character?.biography?.fullName}</p>
              <p><b>Race: </b>${character?.appearance?.race}</p>
              <p><b>Height: </b>${character?.appearance?.height}<p>
              <p><b>Weight: </b>${character?.appearance?.weight}<p>
              <p><b>Groups: </b>${character?.connections?.groupAffiliation}</p>
              <p><b>Occupation: </b>${character?.work?.occupation}</p>
            </div>
          </div>
        </div>
        <div class="col-sm">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Powerstats</h4>
              <div class="card-text">
                <p><b>Combat: </b>${character?.powerstats?.combat}</p>
                <p><b>Durability: </b>${character?.powerstats?.durability}</p>
                <p><b>Intelligence: </b>${character?.powerstats?.intelligence}</p>
                <p><b>Power: </b>${character?.powerstats?.power}</p>
                <p><b>Speed: </b>${character?.powerstats?.speed}</p>
                <p><b>Strength: </b>${character?.powerstats?.strength}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  </div>
  `;

  const voteSection = `
  <section style="width: 40%", >
  <div class="container" >
    <div class="float-left">
      <div class="col-md-12 col-lg-10">
        <div class="card text-dark" style="background-color: #c8f7c1;">
          <div class="card-body p-4">
            <h4 class="mb-0">Character's evaluation</h4>
            <p class="fw-light mb-4 pb-2"><b>Average vote for this character: ${averageVotes}</b></p>
            ${voteForm}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<p></p>
  `

  const commentSection = `
  <section style="width: 70%", >
    <div class="container" >
      <div class="float-left">
        <div class="col-md-12 col-lg-10">
          <div class="card text-dark" style="background-color: #F5F5F5;">
            <div class="card-body p-4">
              <h4 class="mb-0">Comments</h4>
              <p class="fw-light mb-4 pb-2">Classed by likes</p>
              ${commentForm}
              ${comments}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;


  main.innerHTML = displayCharacter + voteSection + commentSection;

  const voteButton = document.querySelectorAll("#voteButton");
  for (let i = 0; i < voteButton.length; i++) {
    const btn = voteButton[i];
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const buttonClicked = e.target;
      const { value } = buttonClicked.dataset;
      if (value) {
        const submited = submitVote(idCharacter, idUser, value);
        OneCharacterPage();
      }
    });
  }

  const commentButton = document.querySelector("#commentButton");
  if (commentButton) {
    commentButton.addEventListener('click', (e) => {
      e.preventDefault();
      const comment = document.getElementById("commentForm");
      postComment(idCharacter, idUser, comment.value);
      OneCharacterPage();
    })
  }

  const likeACommentButton = document.querySelectorAll("#likeACommentButton");
  for (let i = 0; i < likeACommentButton.length; i++) {
    const btn = likeACommentButton[i];
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const buttonClicked = e.target;
      idUser = getSessionObject("idUser");
      const idComment = buttonClicked.dataset.value;
      if (idComment) {
        if (!connected) {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: "Only connected users can like a comment",
            showConfirmButton: false,
            timer: 2000
          });
        }
        const alreadyLiked = await alreadyLikedComment(idComment, idUser);
        console.log(alreadyLiked);
        if (alreadyLiked) {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: "You have already liked this comment",
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          likeAComment(idComment, idUser);
        }
        OneCharacterPage();
      }
    })
  }

};

export default OneCharacterPage;
