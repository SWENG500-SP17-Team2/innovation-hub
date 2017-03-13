class LocalAuth {

   static authenticateUser(token, admin) {
       localStorage.setItem('token', token);
       localStorage.setItem('admin', admin);
   }

   static isUserAuthenticated() {
       return localStorage.getItem('token') !== null;
   }

   static deauthenticateUser() {
     localStorage.removeItem('token');
     localStorage.setItem('admin', false);
   }

   static getToken() {
     return localStorage.getItem('token');
   }

   static isAdmin() {
     return localStorage.getItem('admin') !== false;
   }
}

export default LocalAuth;
