import HomePage from '../Pages/HomePage';
import Logout from '../Logout/Logout';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import OneCharacterPage from '../Pages/OneCharacterPage';
import AddCharacterPage from '../Pages/AddCharacterPage';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/logout': Logout,
  '/OneCharacterPage': OneCharacterPage,
  '/addCharacter' : AddCharacterPage,
};

export default routes;
