import Logout from '../Logout/Logout';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import UserPage from '../Pages/UserPage';
import HomePage from '../Pages/HomePage';
import OneCharacterPage from '../Pages/OneCharacterPage';
import AddCharacterPage from '../Pages/AddCharacterPage';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/logout': Logout,
  '/user' : UserPage,
  '/OneCharacterPage': OneCharacterPage,
  '/addCharacter' : AddCharacterPage,
};

export default routes;