/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { clearPage } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import { getSessionObject,removeSessionObject } from '../../utils/session';
import { readOneCharacter} from '../../models/character';

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
<div class="container>
<p> Affiche ça : ${character.name} </p>
<p> ${character.images.md} </p>
</div>
`;
  


main.innerHTML = displayCharacter;

};

export default OneCharacterPage;
