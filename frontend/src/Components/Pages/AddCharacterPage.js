/* eslint-disable prefer-const */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-restricted-globals */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
// eslint-disable-next-line import/no-cycle


import  openai  from '../../utils/openAI';




const addCharacter = async () => {
  clearPage();
  renderPageTitle('Create a Character');
  Navbar();
  const main = document.querySelector('main');
  const title = document.createElement('h2');
  title.className = 'text-center';
  title.innerHTML = 'Image generator using IA';
  main.appendChild(title);
  const instructions = document.createElement('p');
  instructions.innerHTML =
    'you can generate images by entering short description of the image, add at the end of your description photo-realistic';
  main.appendChild(instructions);

 
  const form = `
  <div class="flex flex-row justify-center">
    <input type="text" id="text" class="form-control" placeholder="A super heros flying…" />
    <button type="button" id="btn" class="btn btn-dark" >
      Generate
    </button>
  </div>`;

  main.innerHTML += form; 
  const btn = document.querySelector('#btn');
  const text = document.getElementById('text');

  // generate image
  btn.addEventListener('click', async() => {
    const response = await openai.createImage({
      prompt: text.value,
      n: 5,
      size: '1024x1024',
    });

    console.log(response);

    const img1 = document.createElement('img');
    img1.className = 'image';
    img1.src = response.data.data[0].url;
    img1.width = 500;
    img1.height = 500;

    const img2 = document.createElement('img');
    img2.className = 'image';
    img2.src = response.data.data[1].url;
    img2.width = 500;
    img2.height = 500;

    const img3 = document.createElement('img');
    img3.className = 'image';
    img3.src = response.data.data[2].url;
    img3.width = 500;
    img3.height = 500;

    main.appendChild(img1);
    main.appendChild(img2);
    main.appendChild(img3);

    const btnRefreshHtml = `
    <button type="button" id="btn2" class="btn btn-dark">
       Refresh
     </button>`;

    main.innerHTML += btnRefreshHtml;
    const btnRefresh = document.querySelector('#btn2');
    btnRefresh.addEventListener('click', () => {
      img1.parentNode.removeChild(img1);
      img2.parentNode.removeChild(img2);
      img3.parentNode.removeChild(img3);
    });
  });
  

 

  
};

export default addCharacter;
