// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';

const SITE_NAME = 'Ultimate Universe ';

const Navbar = () => {
  renderNavbar();
};

function renderNavbar() {
  const authenticatedUser = getAuthenticatedUser();

  const anonymousUserNavbar = `
<nav class="navbar navbar-expand-lg navbar-light bg-info">
      <div class="container-fluid">
      <a class="nav-link active" aria-current="page" href="#" data-uri="/">${SITE_NAME}</a>
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
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" data-uri="/">Home</a>
            </li>      
            <li id="loginItem" class="nav-item">
              <a class="nav-link" href="#" data-uri="/login">Login</a>
            </li>
            <li id="registerItem" class="nav-item">
              <a class="nav-link" href="#" data-uri="/register">Register</a>
            </li>
             <li id="additem" class="nav-item">
              <a class="nav-link" href="#" data-uri="/addCharacter">Create a character</a>
            </li>             
          </ul>
           <form class="form-inline my-2 my-lg-0">
              <input class="form-control" placeholder="Search" aria-label="Close" id = "search">
                <button  type="button" class="btn-close" aria-label="Close" ></button>
              </input>
              <div id="searchname"> </div>
            </form>
        </div>
      </div>
    </nav>
`;

  const authenticatedUserNavbar = `
<nav class="navbar navbar-expand-lg navbar-light bg-info">
      <div class="container-fluid">
      <a class="nav-link active" aria-current="page" href="#" data-uri="/">Ultimate Universe</a>
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
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" data-uri="/">Home</a>
            </li>            
            <li class="nav-item">
              <a class="nav-link" href="#" data-uri="/logout">Logout</a>
            </li>    
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" data-uri="/user">${authenticatedUser?.username}</a>
            </li>           
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control" placeholder="Search" aria-label="Close" id = "search">
            
            </input>
            <div id="searchname"> </div>
          </form>
        </div>
      </div>
    </nav>
`;

  const navbar = document.querySelector('#navbarWrapper');

  navbar.innerHTML = isAuthenticated() ? authenticatedUserNavbar : anonymousUserNavbar;
}

export default Navbar;
