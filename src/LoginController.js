import {authManager, pageResolver} from "./app.js";
import {LoginComponent} from "./LoginComponent";
import {TEMPLATES} from "./BaseComponent";

const initialState = {
    login: {
        value: ''
    },
    password: {
        value: ''
    },
    validCredentials: null
};

export class LoginController {

    constructor(place) {
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
        pageResolver.goTo(pageResolver.pageMapping.signUp.name);
    }

    connect() {
        this.view = new LoginComponent(this.place, TEMPLATES.login, this.handlers);
        this.view.render(this.state);
    }

    updateLogin(value) {
        this.modifyState(state => state.login.value = value);
        this.view.render(this.state);

    }

    updatePassword(value) {
        this.modifyState(state => state.password.value = value);
        this.view.render(this.state);
    }

    submit() {
        const isAuth = authManager.isAuth({
            'login': this.state.login.value,
            'password': this.state.password.value
        });

        this.state = initialState;
        this.updateIsAuthErrorStatus(isAuth);
    }

    updateIsAuthErrorStatus(value) {
        if(value) {
            pageResolver.goTo(pageResolver.pageMapping.home.name);
        } else {
            this.modifyState(state => state.validCredentials = !!value);
            this.view.render(this.state);
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
