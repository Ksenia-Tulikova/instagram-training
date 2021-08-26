import './styles/style.css';

import {VALIDATION_RULES, Validation} from "./Validation.js";
import {AuthManager} from "./AuthManager.js";
import {PageResolver} from "./PageResolver.js";

import {LoginController} from "./LoginController.js";
import {SignUpController} from "./SignUpController.js";
import {HomeController} from "./HomeController.js";


const $main = document.querySelector('main');
export const authManager = new AuthManager();
export const validator = new Validation(VALIDATION_RULES);

const pageConfiguration = {
    login: {
        name: 'login',
        controller: new LoginController($main)
    },
    signUp: {
        name: 'signUp',
        controller: new SignUpController($main)
    },
    home: {
        name: 'home',
        controller: new HomeController($main),
    }
};

export const pageResolver = new PageResolver(pageConfiguration);
pageResolver.goTo(pageConfiguration.login.name);
// pageResolver.goTo(pageConfiguration.home.name);
