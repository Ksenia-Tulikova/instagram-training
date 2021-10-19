export class AuthManager {
    constructor() {
    }

    isAuth(authData) {
        const userData = localStorage.getItem(authData.login);
        return !!userData && (JSON.parse(userData).password === authData.password);
    }

    setActiveUser(userId) {
        sessionStorage.setItem('activeUserId', JSON.stringify(userId));
    }

    deleteUser(localStorageKey) {
        localStorage.removeItem(localStorageKey);
    }

    getUsers () {
        const users = {};
        for (let localStorageKey in {...localStorage }) {
            users[localStorageKey] = JSON.parse(localStorage.getItem(localStorageKey));
        }

        return users;
    }

    getActiveUserId() {
        return JSON.parse(sessionStorage.getItem('activeUserId'));
    }

    updateUser(user) {
        localStorage.setItem(user.login, JSON.stringify(user));
    }
}