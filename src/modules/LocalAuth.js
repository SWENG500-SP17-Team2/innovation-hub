class LocalAuth {

   static authenticateUser(token, user) {
       localStorage.setItem('token', token);
       localStorage.setItem('authenticatedUser', user);
   }

   static isUserAuthenticated() {
       return localStorage.getItem('token') !== null;
   }

   static deauthenticateUser() {
     localStorage.removeItem('token');
     localStorage.removeItem('authenticatedUser');
   }

   static getToken() {
     return localStorage.getItem('token');
   }

   static getAuthenticatedUser () {
     return localStorage.getItem('authenticatedUser');
   }

}

export default LocalAuth;
