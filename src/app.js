import './styles/style.css';

import {VALIDATION_RULES, Validation} from "./Validation.js";
import {AuthManager} from "./AuthManager.js";
import {PageResolver} from "./PageResolver.js";

import {LoginController} from "./LoginController.js";
import {SignUpController} from "./SignUpController.js";
import {HomeController} from "./HomeController.js";
import { UsersTableController } from './UsersTableController';
import { EditUserController } from './EditUserController';
import { Router } from './Router';
import { AboutUsController } from './AboutUsController';
import { ServiceLocation } from './ServiceLocation';
import { ServiceHistory } from './ServiceHistory';


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
    },
    usersTable: {
        name: 'usersTable',
        controller: new UsersTableController($main),
    },
    editUser: {
        name: 'editUser',
        controller: new EditUserController($main),
        countryOptions: ['Belarus', 'Russian Federation', 'Lithuania', 'Poland', 'Ukraine'],
    },
    aboutUs: {
        name: 'aboutUs',
        controller: new AboutUsController($main),
    },
};

export const pageResolver = new PageResolver(pageConfiguration);
export const serviceLocation = new ServiceLocation();
export const serviceHistory = new ServiceHistory();

export const router = new Router();
router.changeRoute(`${window.location.pathname}${window.location.search}`);

document.getElementById('aboutUs').addEventListener('click', () =>{
    router.changeRoute('/aboutUs');

});
// pageResolver.goTo(pageConfiguration.login.name);
// pageResolver.goTo(pageConfiguration.signUp.name);
// pageResolver.goTo(pageConfiguration.usersTable.name);
