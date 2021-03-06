import TopBase from './components/TopBase';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import PostIdea from './components/PostIdea';
import ProfilePage from './components/ProfilePage';
import InnovationList from './components/InnovationList';
import LocalAuth from './modules/LocalAuth';
import Admin from './components/Admin';
import InnovationGraph from './components/InnovationGraph';

const routes = {
    // Base component (wrapper for the whole application)
    component: TopBase,

    childRoutes: [{
            path: '/',
            getComponent: (location, callback) => {
                if (LocalAuth.isUserAuthenticated()) {
                    console.log('\n ======= LocalAuth.isAdmin() ' + LocalAuth.isAdmin() +
                        ' =======\n');
                    if (LocalAuth.isAdmin()) {
                        callback(null, Admin);
                    } else {
                        callback(null, InnovationList);
                    }
                } else {
                    callback(null, HomePage);
                }
            }
        },
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/signup',
            component: SignUpPage
        },
        {
            path: '/NewPost',
            component: PostIdea
        },
        {
            path: '/Dashboard',
            component: InnovationList
        },
        {
            path: '/ProfilePage',
            component: ProfilePage
        },
        {
            path: '/Admin',
            component: Admin
        },
        {
            path: '/InnovationGraph',
            component: InnovationGraph
        },
        {
            path: '/logout',
            onEnter: (nextState, replace) => {
                LocalAuth.deauthenticateUser();

                replace('/');
            }
        }
    ]

};

export default routes;
