/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import { filterCharactersByVotes, filterChararactersByComments, searchCharacters, readAllCharacters } from '../../models/character';
import Navigate from '../Router/Navigate';
import { isAuthenticated } from '../../utils/auths';



const HomePage = async () => {
  clearPage();
  renderPageTitle('HomePage');
  Navbar();
  const authenticated = isAuthenticated();


  const STORE_NAME = "characters";
  let currentFilter;
  let characters;

  // eslint-disable-next-line no-restricted-globals
  const search = location.search.split('search=')[1]
  let searshcontent;

  if (localStorage.getItem(STORE_NAME, currentFilter) === undefined) {
    currentFilter = "default"
    localStorage.setItem(STORE_NAME, currentFilter);
  }
  if (localStorage.getItem(STORE_NAME, currentFilter) === "like") {
    characters = await filterCharactersByVotes();
  }
  else if (localStorage.getItem(STORE_NAME, currentFilter) === "comment") {
    characters = await filterChararactersByComments();
  }
  else {
    currentFilter = "default"
    characters = search ? await searchCharacters(search) : await readAllCharacters();
  }

  const main = document.querySelector('main');
  let table = `<ul class="card-group h-100 justify-content-center">`;
  // eslint-disable-next-line no-unused-expressions
  authenticated && (searshcontent = `<div class="container m-3">
  <div class="row w-100">
    <div class="container h-100">
      <div class="d-flex justify-content-center h-100">
        <div class="searchbar">
         <form>
          <input class="search_input" type="text" name="search" placeholder="Recherche..." id="search">
          <input type="submit" class="search_icon" id="btnSearch">
          </form>
          </div>
      </div>
      </div>
      </div>
      </div>

  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Filter
    </button>
    <ul class="dropdown-menu">
      <li><option class="dropdown-item" data-value="default">Default</option></li>
      <li><option class="dropdown-item" data-value="like">Most Liked</option></li>
      <li><option class="dropdown-item" data-value="comment">Most Commented</option></li>
    </ul>
  </div>
  `
  );
  for (let index = 0; index < characters.length; index++) {
    table += `
    <li class="headPage">
      <div class="container ">
        <div class="row ">
          <div class="col>
            <div class="card  text-black bg-primary mb-3" style="max-width: 18rem; ">
              <div class="card" >
                <div class="card-columns"> 
                  <img class="card-img-top" src="${characters[index]?.images?.md}" alt="Card image cap" />
                  <div class="card-body">
                    <h3 class="card-title"> ${characters[index]?.name}</h3> 
                    <h5 class="card-subtitle"> slug : ${characters[index]?.slug} </h5>
                    <br>
                    <p class="card-text"> Intelligence : ${characters[index]?.powerstats?.intelligence}  </p>
                    <p class="card-text"> Strength : ${characters[index]?.powerstats?.strength}  </p>
                    <p class="card-text"> Speed : ${characters[index]?.powerstats?.speed}  </p>
                    <p class="card-text"> Power : ${characters[index]?.powerstats?.power}  </p>
                    <p class="card-text"> Combat : ${characters[index]?.powerstats?.combat}  </p>
                    <a href="#" class="btn btn-primary button" data-id='${characters[index].id}'> more details</a>   
                  </div>
                </div>
              </div>
            </div>
           </div>
        </div>
      </div> 
    </li>

  `;

  }
  table += `</ul>`;
  main.innerHTML = searshcontent + table;


  const button = document.querySelectorAll(".button");

  // manage the action of button
  // the loop is to apply addEventListenner on all buttons !

  for (const btn of button) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const buttonClicked = e.target;

      console.log(e.target)
      // eslint-disable-next-line prefer-destructuring
      const id = buttonClicked?.dataset?.id;
      if (id) {
        // setSessionObject('id', id);
        localStorage.setItem("idCharacter", id);
        Navigate('/OneCharacterPage');
      }

    });
  };

  const btnSearch = document.getElementById("btnSearch");
  btnSearch.addEventListener("click", () => {
    Navigate('/');
  });

  const filterButton = document.getElementsByClassName("dropdown-item");
  for (const btn of filterButton) {
    // eslint-disable-next-line no-loop-func
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const buttonClicked = e.target;
      const { value } = buttonClicked.dataset;
      if (value) {
        if (value === "like") {
          currentFilter = "like";
          localStorage.setItem(STORE_NAME, currentFilter);
          HomePage();
        } else if (value === "comment") {
          currentFilter = "comment";
          localStorage.setItem(STORE_NAME, currentFilter);
          HomePage();
        }
        else {
          currentFilter = "default";
          localStorage.setItem(STORE_NAME, currentFilter);
          HomePage();
        }
      }
    })
  }
};


export default HomePage;
