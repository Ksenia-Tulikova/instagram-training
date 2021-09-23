import './styles/style.css';

import {AuthManager} from "./AuthManager.js";
import {PageResolver} from "./PageResolver.js";

import {LoginController} from "./pages/Login/LoginController.js";
import {SignUpController} from "./pages/SignUp/SignUpController.js";
import {HomeController} from "./pages/Home/HomeController.js";
import { UsersTableController } from './pages/UsersTable/UsersTableController';
import { EditUserController } from './pages/EditUser/EditUserController';
import { Router } from './Router';
import { AboutUsController } from './pages/AboutUs/AboutUsController';
import { ServiceLocation } from './ServiceLocation';
import { ServiceHistory } from './ServiceHistory';


const $main = document.querySelector('main');
const $additionalContainer = document.querySelector('.additional-container');
const $mainContainer = document.querySelector('.main-container');

export const authManager = new AuthManager();

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

export const pageResolver = new PageResolver(pageConfiguration, $additionalContainer, $mainContainer);
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
