import {authManager, pageResolver, validator} from "./app.js";
import {PAGES} from "./PageResolver.js";

const initialState = {
    login: {
        value: '',
        errorMessage: ''
    },
    password: {
        value: '',
        errorMessage: ''
    },
    repeatPassword: {
        value: '',
        errorMessage: ''
    },
    isLogged: false
};

export class SignUpController {

    constructor() {
        this.state = initialState;
        this.handlers = {
            onLoginBlur: this._onLoginBlur.bind(this),
            onPasswordBlur: this._onPasswordBlur.bind(this),
            onSubmit: this._onSubmit.bind(this),
            onRepeatPasswordBlur: this._onRepeatPasswordBlur.bind(this)
        };
    }

    _onLoginBlur(login) {
        this.updateLogin(login);
    }

    _onPasswordBlur(password) {
        this.updatePassword(password);
    }

    _onRepeatPasswordBlur(password) {
        this.updateRepeatPassword(password);
    }

    _onSubmit() {
        this.submit();
    }

    _arrangeErrors(validationData, validationResult) {
        for (const field in validationData) {
            if (!validationResult.isValid) {
                this.state[field].errorMessage = validationResult.errorMessages[field] || '';
            }
        }
    }

    connect(viewComponent) {
        this.view = viewComponent;
        this.view.render(this.state, this.handlers);
    }

    updateLogin(value) {
        this.state.login.value = value;
        this.state.login.errorMessage = '';

        const fieldValidationResult = validator.validateField('login', value);

        if (!fieldValidationResult.isValid) {
            this.state.login.errorMessage = fieldValidationResult.errorMessage;
        }

        this.modifyState();

        this.view.render(this.state, this.handlers);
    }

    updatePassword(value) {
        this.state.password.value = value;
        this.state.password.errorMessage = ''; // зачистить все ошибки костыль
        this.state.repeatPassword.errorMessage = '';

        const fieldValidationResult = validator.validateField('password', value);


        if (fieldValidationResult.isValid) {
            const validationData = {
                'password': value,
                'repeatPassword': this.state.repeatPassword.value
            };

            const commonValidationResult = validator.validateCommon(validationData);

            this._arrangeErrors(validationData, commonValidationResult);

        } else {
            this.state.password.errorMessage = fieldValidationResult.errorMessage;
        }

        this.modifyState();

        this.view.render(this.state, this.handlers);
    }

    updateRepeatPassword(value) {
        this.state.repeatPassword.value = value;
        this.state.repeatPassword.errorMessage = '';


        const fieldValidationResult = validator.validateField('repeatPassword', value);

        if (fieldValidationResult.isValid) {

            const validationData = {
                'password': this.state.password.value,
                'repeatPassword': value
            }

            const commonValidationResult = validator.validateCommon(validationData);

            this._arrangeErrors(validationData, commonValidationResult);

        } else {
            this.state.repeatPassword.errorMessage = fieldValidationResult.errorMessage;
        }

        this.modifyState();

        this.view.render(this.state, this.handlers);
    }

    submit() {
        const authData = {
            'login': this.state.login.value,
            'password': this.state.password.value,
            'repeatPassword': this.state.repeatPassword.value
        };

        const validationResult = validator.validateGlobal(authData);


        if (validationResult.isValid) {
            authManager.setNewUser(authData);

            this.modifyState(state => state.isLogged = true);

            pageResolver.goTo(PAGES.home);
        } else {
            this.modifyState(state => {
                for (const fieldName in validationResult.errorMessages) {
                    state[fieldName].errorMessage = validationResult.errorMessages[fieldName];
                }
            })
        }

        this.view.render(this.state, this.handlers);
    }

    modifyState(stateModifier) {
        const newState = JSON.parse(JSON.stringify(this.state));
        if (stateModifier) {
            stateModifier(newState);
        }
        this.state = newState;
    }

}