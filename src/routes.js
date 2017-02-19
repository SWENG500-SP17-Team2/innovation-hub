import TopBase from './components/TopBase';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

const routes = {
   // Base component (wrapper for the whole application)
   component : TopBase,

   childRoutes: [
     {path: '/', component: HomePage},
     {path: '/login', component: LoginPage},
     {path: '/signup', component: SignUpPage}
   ]

};

export default routes;
