/* eslint-disable prefer-destructuring */
/* eslint-disable no-alert */
/* eslint-disable prefer-const */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-restricted-globals */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import {readGeneratedImages } from '../../models/openai';
import Navigate from '../Router/Navigate';


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

  // form generate image 
  const formImage = `
  <div class="flex flex-row justify-center">
    <input type="text" id="text" class="form-control" placeholder="A super heros flying…" />
    <button type="button" id="btn" class="btn btn-dark" >
      Generate
    </button>
  </div>`;

  main.innerHTML += formImage;
  const btn = document.getElementById('btn');
  const text = document.getElementById('text');
 
  // generate image
  btn.addEventListener('click', async (event) => {
    event.preventDefault();
    
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          prompt : text.value
        }),
        headers: {
          "Content-Type": "application/json",

        },
      };
      const response = await fetch(`api/openai`, options);
      if (!response.ok) {
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("addCharacter::error: ", error);
    }

    
    const generatedImages = await readGeneratedImages();
    console.log(generatedImages);
    const img1 = document.createElement('img');
    img1.className = 'image';
    // eslint-disable-next-line prefer-destructuring
    img1.src = generatedImages[0];
    img1.width = 500;
    img1.height = 500;

    const img2 = document.createElement('img');
    img2.className = 'image';
    img2.src = generatedImages[1];
    img2.width = 500;
    img2.height = 500;

    const img3 = document.createElement('img');
    img3.className = 'image';
    img3.src = generatedImages[2];
    img3.width = 500;
    img3.height = 500;

    main.appendChild(img1);
    main.appendChild(img2);
    main.appendChild(img3);
    /*
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
    */

  });

  const stringForm = `
  <div class="text-center">
    <h3>Add a character</h3>
    <form enctype="multipart/form-data"  id="form" method="post" class="px-5" id="form">
      <div class="mb-3">
        <label for="<name">name</label>
        <input type="text" name="name"id="name"class="form-control" placeholder="Enter name"/>
      </div>
      <div> <h4> powerstats </h4> <br> </div>
      <div class="mb-3">
        <label for="intelligence" class="form-label">intelligence</label>
        <input type="number"  name="intelligence" id="intelligence" class="form-control" placeholder="points of intelligence out of 100 "/>
      </div>
      <div class="mb-3">
        <label for="strength" class="form-label"> strength </label>
        <input type="number" name="strength" id="strength" class="form-control" placeholder="points of strength out of 100"/>
      </div>
      <div class="mb-3">
        <label for="speed" class="form-label">speed</label>
        <input type="number" name="speed" id="speed" class="form-control" placeholder="points of speed out of 100"/>
      </div>
      <div class="mb-3">
        <label for="durability" class="form-label">durability</label>
        <input type="number" name="durability" id="durability" class="form-control" placeholder="points of durability out of 100"/>
      </div>
      <div class="mb-3">
        <label for="power" class="form-label">power</label>
        <input type="number" name="power" id="power" class="form-control" placeholder="points of power out of 100"/>
      </div>
      <div class="mb-3">
        <label for="combat" class="form-label"> combat</label>
        <input type="number" name="combat" id="combat" class="form-control" placeholder="points of combat out of 100"/>
      </div>
      <br>
      <div> <h4> Appearance </h4> <br> </div>
      <div class="mb-6">
        <label for="genre" > Genre </label>
        <select class="form-select aria-label="select" >
          <option selected> Genre </option>
          <option value="m"> Male </option>
          <option value="f"> Female </option>
          <option value = "h"> hermaphrodite </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="race" class="form-label">race</label>
      <input type="text" name="race" id="race" class="form-control" placeholder="Enter the race "/>
      </div>
      <div class="mb-3">
        <label for="height" class="form-label">height</label>
        <input type="number" name="height" id="height" class="form-control" placeholder="Enter the height in cm" />
      </div>
      <div class="mb-3">
        <label for="weight" class="form-label">weight</label>
        <input type="number" name="weight" id="weight" class="form-control" placeholder="Enter the weight in kg" />
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">image</label>
        <input type="file" name="image" id="image" accept="image/*" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary" id="btn1">Submit</button>
    </form>
  </div>`;


  main.innerHTML += stringForm;
  
  const getForm = document.getElementById('form');
  /*
  const select = document.querySelector('select');
  const name = document.getElementById('name');
  const intelligence = document.getElementById('intelligence');
  const strength = document.getElementById('strength');
  const speed = document.getElementById('speed');
  const durability = document.getElementById('durability');
  const power = document.getElementById('power');
  const combat = document.getElementById('combat');
  const genre = select;
  const race = document.getElementById('race');
  const height = document.getElementById('height');
  const weight = document.getElementById('weight');
  */
  const imageInput = document.getElementById('image');
  const imageFile = imageInput.files[0];

  const formData = new FormData(getForm);
  
  getForm.addEventListener('submit', async (event) => {
    // let data = new FormData(getForm);
    // console.log(data.get("image"));
    // console.log(image.files[0]);
    console.log(imageFile);
    event.preventDefault();
    formData.append('image', imageFile);
   
   
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({

         formData

        }),
        headers: {
          "Content-Type": "application/json",

        },
      };
       console.log(options);
      const response = await fetch(`api/characters/addCharacter`, options);
      console.log(response);
      if (!response.ok) {
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("addCharacter::error: ", error);
    }

    
  

    Navigate('/');
  });


};

export default addCharacter;
