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

    getUser(localStorageKey) {
        return JSON.parse(localStorage.getItem(localStorageKey));
    }

    updateUser(user) {
        localStorage.setItem(user.login, JSON.stringify(user));
    }
}