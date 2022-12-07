/* eslint-disable no-restricted-syntax */
/* eslint-disable no-restricted-globals */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
// eslint-disable-next-line import/no-cycle
import { readAllCharacters } from '../../models/character';
import { setSessionObject } from '../../utils/session';
import Navigate from '../Router/Navigate';



const HomePage = async () => {
  clearPage();
  renderPageTitle('HomePage');
  Navbar();

  // data for without filter
  const characters = await readAllCharacters();
  // data for filter
  // const character2 = await readAllCharacters();
  const main = document.querySelector('main');
  const title = `<h1 class = "title"> All Characters </h1>`;
  let table = `<ul class="card-group h-100 justify-content-center">`;

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
  
  main.innerHTML = title +  table;
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
  
};

export default HomePage;
