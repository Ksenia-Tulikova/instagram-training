import { authManager, router } from '../../app.js';
import {LoginComponent} from "./LoginComponent";
import { BaseController } from '../BaseController';
import { authenticate } from '../../api';

const initialState = {
    login: {
        value: ''
    },
    password: {
        value: ''
    },
    validCredentials: null
};

export class LoginController extends BaseController {

    constructor(place) {
        super(undefined);
        this.place = place;
        this.state = initialState;
        this.handlers = {
            onLoginBlur: {
                queryParam: 'input[name="login"]',
                eventType:'blur',
                callback: this._onLoginBlur.bind(this),
            },
            onPasswordBlur: {
                queryParam: 'input[name="password"]',
                eventType:'blur',
                callback: this._onPasswordBlur.bind(this),
            },
            onSubmit:{
                queryParam: '.button-sign-in',
                eventType:'click',
                callback: this._onSubmit.bind(this),
            },
            onSignUp: {
                queryParam: '.button-sign-up',
                eventType:'click',
                callback: this._onSignUp.bind(this),
            }
        };
    }

    _onLoginBlur(event) {
        this.updateLogin(event.target.value);
    }

    _onPasswordBlur(event) {
        this.updatePassword(event.target.value);
    }

    _onSubmit(event) {
        event.preventDefault();
        this.submit();
    }

    _onSignUp(event) {
        event.preventDefault();
        router.changeRoute('/signUp');
    }

    connect() {
        this.view = new LoginComponent(this.place, this.handlers);
        return this.view.render(this.state);
    }

    updateLogin(value) {
        this.modifyState(state => state.login.value = value);
    }

    updatePassword(value) {
        this.modifyState(state => state.password.value = value);
    }

    async submit() {
        const isAuth = await authenticate({
                'login': this.state.login.value,
                'password': this.state.password.value
            });

        this.state = initialState;
        this.updateIsAuthErrorStatus(isAuth);
    }

    updateIsAuthErrorStatus(value) {
        if(value) {
            authManager.setActiveUser(value);
            router.changeRoute('/users');
        } else {
            this.modifyState(state => state.validCredentials = !!value);
            this.view.updateValidCredentialsClass();
        }
    }

    modifyState(stateModifier) {
        const newState = JSON.parse(JSON.stringify(this.state));
        if (stateModifier) {
            stateModifier(newState);
        }
        this.state = newState;
    }
}

