/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { clearPage } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import { getSessionObject, removeSessionObject } from '../../utils/session';
import { readOneCharacter } from '../../models/character';

const OneCharacterPage = async () => {
  clearPage();
  Navbar();

  const main = document.querySelector('main');
  // recover the id character by clicking on the button
  const idCharacter = getSessionObject("id");
  console.log(idCharacter);
  const character = await readOneCharacter(idCharacter);
  // delete from session storage to clean
  removeSessionObject("id");

  console.log(character);


  let displayCharacter = "";
  displayCharacter += `
    <div class="hero-body">
            <div class="container has-text-centered">
                <div class="columns is-vcentered">
                    <div class="column is-5">
                     <h1 class="title is-2">
                           ${character.name}
                        </h1>
                        <figure class="image is-4by3 align="center">
                            <img src="${character.images.lg}" alt="characterImage">
                        </figure>
                    </div>
                    <div class="column is-6 is-offset-1">
                        
                        <br>
                        <p class="has-text-centered">
                            
                        </p>
                    </div>
                </div>
            </div>
        </div>

`;



  main.innerHTML = displayCharacter;

};

export default OneCharacterPage;
