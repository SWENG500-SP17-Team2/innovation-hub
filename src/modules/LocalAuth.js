class LocalAuth {

    static authenticateUser(token, user, email, admin) {
        localStorage.setItem('token', token);
        localStorage.setItem('authenticatedUser', user);
        localStorage.setItem('authenticatedEmail', email);
        localStorage.setItem('admin', admin);
    }

    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    static deauthenticateUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('authenticatedUser');
        localStorage.removeItem('authenticatedEmail');
        localStorage.setItem('admin', false);
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static getAuthenticatedUser() {
        return localStorage.getItem('authenticatedUser');
    }

    static getAuthenticatedEmail() {
        return localStorage.getItem('authenticatedEmail');
    }

    static isAdmin() {
        return localStorage.getItem('admin') === 'true';
    }
}

export default LocalAuth;
