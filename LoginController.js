import {authManager, pageResolver} from "./app.js";
import {PAGES} from "./PageResolver.js";

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

    constructor() {
        this.state = initialState;
        this.handlers = {
            onLoginBlur: this._onLoginBlur.bind(this),
            onPasswordBlur: this._onPasswordBlur.bind(this),
            onSubmit: this._onSubmit.bind(this),
            onSignUp: this._onSignUp.bind(this),
        };
    }

    _onLoginBlur(login) {
        this.updateLogin(login);
    }

    _onPasswordBlur(password) {
        this.updatePassword(password);
    }

    _onSubmit() {
        this.submit();
    }

    _onSignUp() {
        pageResolver.goTo(PAGES.signUp);
    }

    connect(viewComponent) {
        this.view = viewComponent;
        this.view.render(this.state, this.handlers);
    }

    updateLogin(value) {
        this.modifyState(state => state.login.value = value);
        this.view.render(this.state, this.handlers);
    }

    updatePassword(value) {
        this.modifyState(state => state.password.value = value);
        this.view.render(this.state, this.handlers);
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
            pageResolver.goTo(PAGES.home);
        } else {
            this.modifyState(state => state.validCredentials = value);

            this.view.render(this.state, this.handlers);
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