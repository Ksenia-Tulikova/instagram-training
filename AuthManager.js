export class AuthManager {
    constructor() {
    }

    isAuth(authData) {
        const userData = localStorage.getItem(authData.login);
        return !!userData && (JSON.parse(userData).password === authData.password);
    }

    setNewUser(authData) {
        localStorage.setItem(authData.login, JSON.stringify(authData));
    }


}