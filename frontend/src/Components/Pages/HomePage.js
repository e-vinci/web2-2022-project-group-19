/* eslint-disable no-console */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
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
  console.log(characters);
  
  const main = document.querySelector('main');
  const title = `<h1 class = "title"> All Characters </h1>`;
  let table = `<ul class="card-group h-100 justify-content-center">`;

  for (let index = 0; index < characters.length; index++) {
  table += `<li class="headPage">
     <div class="container ">
        <div class="row ">
          <div class="col">
             <div class="card text-black bg-primary mb-3" style="max-width: 18rem; ">
               <div class="card" >
                 <div class="card-columns"> 
                   <img class="card-img-top" src="${characters[index]?.images?.md}" alt="Card image cap" />
                   <div class="card-body">
                    <h3 class="card-title"> ${characters[index].name}</h3> 
                    <br>
                    <p class="card-text"> Intelligence : ${characters[index].powerstats?.intelligence}  </p>
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
  
  main.innerHTML = title + table;
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

      }
      Navigate('/OneCharacter');
    })
  }
  
};

export default HomePage;
