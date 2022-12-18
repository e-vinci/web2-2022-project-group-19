// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';
import light from '../../img/light.png';

const SITE_NAME = 'ULTIMATE UNIVERSE';


const Navbar = () => {
  renderNavbar();
};

function renderNavbar() {
  const authenticatedUser = getAuthenticatedUser();

  const anonymousUserNavbar = `
<nav class="navbar navbar-expand-lg navbar-light bg-warning px-5">
      <div class="container px-5">
      <a class="nav-link active" aria-current="page" href="#" data-uri="/animation"> <img src='${light}' height='30px' >
      <span class="ms-2  fw-bold  fs-5" data-uri="/animation">${SITE_NAME}  </span></a>
     
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 float-right px-5">
            <li class="nav-item px-2">
              <a class="nav-link  btn btn-outline-light  rounded-pill px-4 " aria-current="page" href="#" data-uri="/">Home</a>
            </li>      
            <li id="loginItem" class="nav-item px-2">
              <a class="nav-link btn btn-outline-light rounded-pill px-4" href="#" data-uri="/login">Login</a>
            </li>
            <li id="registerItem" class="nav-item px-2">
              <a class="nav-link  btn btn-outline-light rounded-pill px-4" href="#" data-uri="/register">Register</a>
            </li>            
          </ul>
        </div>
      </div>
    </nav>
`;
  const authenticatedUserNavbar = `
<nav class="navbar navbar-expand-lg navbar-light bg-warning px-5">
      <div class="container-fluid">
      <a class="nav-link active px-2" aria-current="page" href="#" data-uri="/animation"> <img src='${light}' height='60px' >
      <span class="ms-2  fw-bold  fs-5" data-uri="/animation">${SITE_NAME}  </span></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 float-right px-5">
        <li class="nav-item  px-1">
            <a class="nav-link  btn btn-outline-light  rounded-pill px-4 " aria-current="page" href="#" data-uri="/">Home</a>
            </li>                       
            <li class="nav-item px-1">
            <a class="nav-link  btn btn-outline-light rounded-pill px-4" href="#" data-uri="/profile">Profile</a>
            </li>   
        ${authenticatedUser?.isAdmin ? `         
        <li class="nav-item px-1">
        <a class="nav-link  btn btn-outline-light rounded-pill px-4" href="#" data-uri="/member">Members</a>
         </li>     ` : `  `}
    
         <li id="additem" class="nav-item">
         <a class="nav-link  btn btn-outline-light rounded-pill px-4" href="#" data-uri="/addCharacter">Create a character</a>
       </li>          
        <li class="nav-item px-1">
      <a class="nav-link  btn btn-outline-light rounded-pill px-4" href="#" data-uri="/aboutus">About us</a>
       </li>  
          <li class="nav-item px-1">
          <a class="nav-link  btn btn-outline-light rounded-pill px-4" href="#" data-uri="/logout">Logout</a>
          </li>    
            <li class="nav-item px-5">
            <a class="nav-link  btn btn-outline-light rounded-pill px-4" href="#" >${authenticatedUser?.username}</a>
            </li>           
          </ul>
        </div>
      </div>
    </nav>
`;

  const navbar = document.querySelector('#navbarWrapper');

  navbar.innerHTML = isAuthenticated() ? authenticatedUserNavbar : anonymousUserNavbar;
}

export default Navbar;