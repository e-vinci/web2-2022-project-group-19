import Logout from '../Logout/Logout';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import UserPage from '../Pages/UserPage';
import HomePage from '../Pages/HomePage';
import AdminPage from '../Pages/AdminPage';
import MemberPage from '../Pages/MemberPage';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/logout': Logout,
  '/user' : UserPage,
  '/admin' : AdminPage,
  '/member' : MemberPage,
};

export default routes;