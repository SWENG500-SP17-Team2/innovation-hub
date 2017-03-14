class LocalAuth {

   static authenticateUser(token, user, admin) {
       localStorage.setItem('token', token);
       localStorage.setItem('authenticatedUser', user);
       localStorage.setItem('admin', admin);
   }

   static isUserAuthenticated() {
       return localStorage.getItem('token') !== null;
   }

   static deauthenticateUser() {
     localStorage.removeItem('token');
     localStorage.removeItem('authenticatedUser');
     localStorage.setItem('admin', false);
   }

   static getToken() {
     return localStorage.getItem('token');
   }

   static getAuthenticatedUser () {
     return localStorage.getItem('authenticatedUser');
   }

   static isAdmin() {
     return localStorage.getItem('admin') !== false;
   }
}

export default LocalAuth;
