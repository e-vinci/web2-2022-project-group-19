/* eslint-disable no-restricted-syntax */
/* eslint-disable no-restricted-globals */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
// eslint-disable-next-line import/no-cycle
import { filterCharactersByVotes, filterChararactersByComments, readAllCharacters} from '../../models/character';
import { setSessionObject } from '../../utils/session';
import Navigate from '../Router/Navigate';
// import { getAverageVotes } from '../../models/vote';



const HomePage = async () => {
  clearPage();
  renderPageTitle('HomePage');
  Navbar();

  // data for without filter
  const STORE_NAME = "characters";
  let currentFilter;


  // let characters = await readAllCharacters();
  let characters;
  if(localStorage.getItem(STORE_NAME,currentFilter) === undefined){
    currentFilter = "default"
    localStorage.setItem(STORE_NAME,currentFilter);
  }
  if(localStorage.getItem(STORE_NAME,currentFilter) === "like"){
    characters = await filterCharactersByVotes();
    console.log("Filter: like");
  }
  else if(localStorage.getItem(STORE_NAME,currentFilter) === "comment"){
    characters = await filterChararactersByComments();
    console.log("Filter: comment");
  }
  else{
    currentFilter = "default"
    characters = await readAllCharacters();
  }
  // data for filter
  // const character2 = await readAllCharacters();
  const main = document.querySelector('main');
  const title = `<h1 class = "title"> All Characters </h1>`;
  let table = `<ul class="card-group h-100 justify-content-center">`;

  const filter = `
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
  `;



  // searchbar code
  /*
  const search = document.querySelector('#search');
  const searchbar = document.querySelector('#searchname');
  const close = document.querySelector('.btn-close');
  close.style.visibility = 'hidden';
  close.addEventListener('click', (event) => {
    searchbar.innerHTML = '';
    search.value = '';
    close.style.visibility = 'hidden';
  });
  search.addEventListener('keyup', async (event) => {
    close.style.visibility = 'visible';
    searchbar.innerHTML = '';
    let max = 0;
    for (let index = 0; index < character2.length; index++) {
      if (
        (character2[index].title.startsWith(search.value) ||
        character2[index].title.toLowerCase().startsWith(search.value.toLowerCase()) ||
        character2[index].title.toUpperCase().startsWith(search.value.toUpperCase())) && max < 5) 
      {
      searchbar.innerHTML += `<p id="name" data-id=${character2[index].id}> ${character2[index].title}</p>`;
      max++;
      }
    }
    if (search.value == '') {
    searchbar.innerHTML = '';
    close.style.visibility = 'hidden';
    }
    const characterName = document.querySelectorAll('#name');
    characterName.forEach((element) => {
      element.addEventListener('click', (event) => {
         let uri = event.target.dataset.id;
         sessionStorage.setItem('clé', uri);
        Navigate('/');
        location.reload();
      });
    });
  });
  */

  // display without the filter from searchbar
  for (let index = 0; index < characters.length; index++) {
  table += `<li class="headPage">
     <div class="container ">
        <div class="row ">
          <div class="col>
             <div class="card  text-black bg-primary mb-3" style="max-width: 18rem; ">
               <div class="card" >
                 <div class="card-columns"> 
                   <img class="card-img-top" src="${characters[index].images.md}" alt="Card image cap" />
                   <div class="card-body">
                    <h3 class="card-title"> ${characters[index].name}</h3> 
                    <h5 class="card-subtitle"> slug : ${characters[index].slug} </h5>
                    <br>
                    <p class="card-text"> Intelligence : ${characters[index].powerstats.intelligence}  </p>
                    <p class="card-text"> Strength : ${characters[index].powerstats.strength}  </p>
                    <p class="card-text"> Speed : ${characters[index].powerstats.speed}  </p>
                    <p class="card-text"> Power : ${characters[index].powerstats.power}  </p>
                    <p class="card-text"> Combat : ${characters[index].powerstats.combat}  </p>
                    <button class="btn btn-primary" id="button"  data-id="${characters[index].id}" > more details </button>  
                       
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
  main.innerHTML = title + filter + table;

  const button = document.querySelectorAll("#button");
  
  // manage the action of button
  // the loop is to apply addEventListenner on all buttons !
  for (const btn of button){
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const buttonClicked = e.target;
      // eslint-disable-next-line prefer-destructuring
      const id = buttonClicked?.dataset?.id;
      if (id) {
        setSessionObject('id', id);
        Navigate('/OneCharacterPage');
      }

    })
  }
  
  const filterButton = document.getElementsByClassName("dropdown-item");
  console.log("Filter button: ", filterButton);
  for(const btn of filterButton){
    // eslint-disable-next-line no-loop-func
    btn.addEventListener('click', async (e)=>{
      e.preventDefault();
      const buttonClicked = e.target;
      const {value} = buttonClicked.dataset;
      if(value){
        console.log("Value Filter:" , value);
        if(value === "like"){
          currentFilter = "like";
          localStorage.setItem(STORE_NAME,currentFilter);
          // à modifier
          location.reload();
        }else if(value === "comment"){
          currentFilter = "comment";
          localStorage.setItem(STORE_NAME,currentFilter);
          // à modifier
          location.reload();
        }
        else{
          currentFilter = "default";
          localStorage.setItem(STORE_NAME,currentFilter);
          // à modifier
          location.reload();
        }
      }
    })
  }

};

export default HomePage;
