/* eslint-disable no-plusplus */
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import { readAllCharacters, searchCharacters } from '../../models/character';
import SearchIcon from "../../img/search-icon.png";
import Navigate from '../Router/Navigate';


const HomePage = async (search) => {
  clearPage();
  renderPageTitle('HomePage');
  Navbar();
  //const characters = await readAllCharacters();
  var search = location.search.split('search=')[1]

  const characters = search ? await searchCharacters(search) : await readAllCharacters();
  const main = document.querySelector('main');
  const title = `<h1 class = "title"> All Characters </h1>`;
  let table = `<ul class="card-group h-100 justify-content-center">`;
  table += `<div class="container m-3">
  <h4 class ="m-3">Liste des characters</h4>
  <div class="row">
    <div class="container h-100">
      <div class="d-flex justify-content-center h-100">
        <div class="searchbar">
         <form>
          <input class="search_input" type="text" name="search" placeholder="Recherche..." id="search">
          <input type="submit" class="search_icon" id="btnSearch"><img src ="${SearchIcon}" height="20px">
          </form>
          </div>
      </div>
      </div>
      </div>
  </div>
  `;
  for (let index = 0; index < characters.length; index++) {
    table += `
    <li class="headPage">
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
                    <a href="#" class="btn btn-primary"> more details</a>   
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
  let btnSearch = document.getElementById("btnSearch");
  btnSearch.addEventListener("click", () => {
    let search = document.getElementById("search").value;
    Navigate('/');
  });
};

// pour push

export default HomePage;
