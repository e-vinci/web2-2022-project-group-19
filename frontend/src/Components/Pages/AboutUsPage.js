import anime from 'animejs/lib/anime.es';

const AboutUsPage = () => {
    const main = document.querySelector('main');
    main.innerHTML = 
    `
<h1 class="ml7">
    <span class="text-wrapper">
    <span class="letters">About us</span>
    </span>
</h1>

<div id="textAboutUs">
    <br>
    This website was created entirely in Javascript and Ergonomics by 5 students in managment computing at 
    the Léonard de vinci institute.</br>
    <br> 
    We have chosen to create a small website of exchange and sharing on the universe of superheroes and big 
    vilains of fictions. 
    </br>
    <br>
    If you notice any glitches, bugs, or just want to send us 
    feedback :  
    </br>
    </h5>
    <br></br>
    <h5>Loubna.eljattari@student.vinci.be</h5>
    <h5>Diego.gilson@student.vinci.be</h5>
    <h5>Gerald.crisostomo@student.vinci.be</h5>
    <h5>Clement.dedessuslesmous@student.vinci.be</h5>
    <h5>Corentin.Decoster@student.vinci.be</h5>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script>
    `;

const textWrapper = document.querySelector('.ml7 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml7 .letter',
    translateY: ["1.1em", 0],
    translateX: ["0.55em", 0],
    translateZ: 0,
    rotateZ: [180, 0],
    duration: 750,
    easing: "easeOutExpo",
    delay: (el, i) => 50 * i
  }).add({
    targets: '.ml7',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
};

export default AboutUsPage;