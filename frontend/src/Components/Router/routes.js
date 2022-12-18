import Logout from '../Logout/Logout';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import HomePage from '../Pages/HomePage';
import MemberPage from '../Pages/MemberPage';
import AddCharacterPage from '../Pages/AddCharacterPage';


const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/logout': Logout,
  '/addCharacter': AddCharacterPage,
  '/member': MemberPage,
};

export default routes;