import Logout from '../Logout/Logout';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import UserPage from '../Pages/UserPage';
import HomePage from '../Pages/HomePage';
import AnimationPage from '../Pages/AnimationPage';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/logout': Logout,
  '/user' : UserPage,
  '/animation' : AnimationPage,
};

export default routes;