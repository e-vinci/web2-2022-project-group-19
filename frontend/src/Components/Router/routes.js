import Logout from '../Logout/Logout';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import UserPage from '../Pages/UserPage';
import HomePage from '../Pages/HomePage';
import TestPage from '../Pages/TestPage';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/logout': Logout,
  '/user' : UserPage,
  '/test' : TestPage,
};

export default routes;