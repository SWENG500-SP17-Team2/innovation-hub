import TopBase from './components/TopBase';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import PostIdea from './components/PostIdea';
import InnovationList from './components/InnovationList';
import LocalAuth from './modules/LocalAuth';
import Admin from './components/Admin';
import DashboardPage from './components/DashboardPage';

const routes = {
   // Base component (wrapper for the whole application)
   component : TopBase,

   childRoutes: [
     {path: '/',
        getComponent: (location, callback) => {
           if(LocalAuth.isUserAuthenticated()) {
              //callback(null, InnovationList);
              callback(null, DashboardPage);
           } else {
              callback(null, HomePage);
              //callback(null, Admin);
           }
        }
     },
     {path: '/login', component: LoginPage},
     {path: '/signup', component: SignUpPage},
     {path: '/NewPost', component: PostIdea},
     //{path: '/Dashboard', component: InnovationList},
     {path: '/Dashboard', component: DashboardPage},
     {path: '/Admin', component: Admin},
     {path: '/logout',
        onEnter: (nextState, replace) => {
           LocalAuth.deauthenticateUser();

           replace('/');
        }
     }
   ]

};

export default routes;
