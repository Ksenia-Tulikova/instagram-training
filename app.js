import {LoginComponent} from "./LoginComponent.js";
import {VALIDATION_RULES, Validation} from "./Validation.js";
import {AuthManager} from "./AuthManager.js";
import {SignUpComponent} from "./SignUpComponent.js";
import {LoginController} from "./LoginController.js";
import {SignUpController} from "./SignUpController.js";
import {PageResolver, PAGES} from "./PageResolver.js";
import {Home} from "./Home.js";

const $main = document.querySelector('main');
export const authManager = new AuthManager();
export const validator = new Validation(VALIDATION_RULES);

const pageConfiguration = {
    login: {
        view: LoginComponent,
        controller: new LoginController()
    },
    signUp: {
        view: SignUpComponent,
        controller: new SignUpController()
    },
    home: {
        view: Home
    }
};

export const pageResolver = new PageResolver($main, pageConfiguration);
pageResolver.goTo(PAGES.login);
// pageResolver.goTo(PAGES.home);
