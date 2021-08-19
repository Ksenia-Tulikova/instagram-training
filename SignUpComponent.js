import {authManager, validator} from "./app.js";

export class SignUpComponent {
    constructor($formInsertPlace) {
        this.place = $formInsertPlace;
        this.isInitialized = false;
        this.handlers = {};
    }

    init() {
        const signUpForm = `<div class="sign-up">
            <form class="form">
                <h2>Sign Up right now!</h2>
                <div class="form-field">
                    <label for="sign-up-mail"><i class="fas fa-user"></i></label>
                    <input id="sign-up-mail" type="text" name="login" placeholder="E-Mail">
                    <span class="error-message login-error-message"></span>
                </div>
                <div class="form-field">
                    <label for="sign-up-password"><i class="fas fa-lock"></i></label>
                    <input id="sign-up-password" type="password" name="password" placeholder="Password">
                    <span class="error-message password-error-message" ></span>
                </div>
                <div class="form-field">
                    <label for="sign-up-password-repeat"><i class="fas fa-lock"></i></label>
                    <input id="sign-up-password-repeat" type="password" name="repeat-password" placeholder="Repeat password">
                    <span class="error-message repeat-password-error-message"></span>
                </div>
                <button type="submit" class="button button-sign-up">
                    <div class="arrow-wrapper">
                        <span class="arrow"></span>
                    </div>
                    <p class="button-text">SIGN UP</p>
                </button>
            </form>
        </div>`;

        this.place.insertAdjacentHTML('afterbegin', signUpForm);
    }

    updateEventListeners(onLoginBlur, onPasswordBlur, onSubmit, onRepeatPasswordBlur) {
        if (this.handlers.onLoginBlur !== onLoginBlur) {
            this.place.querySelector('input[name="login"]').addEventListener('blur', (event) => {
                onLoginBlur(event.target.value);
            })
            this.handlers.onLoginBlur = onLoginBlur;
        }

        if (this.handlers.onPasswordBlur !== onPasswordBlur) {
            this.place.querySelector('input[name="password"]').addEventListener('blur', (event) => {
                onPasswordBlur(event.target.value);
            })
            this.handlers.onPasswordBlur = onPasswordBlur;
        }

        if (this.handlers.onRepeatPasswordBlur !== onRepeatPasswordBlur) {
            this.place.querySelector('input[name="repeat-password"]').addEventListener('blur', (event) => {
                onRepeatPasswordBlur(event.target.value);
            })
            this.handlers.onRepeatPasswordBlur = onRepeatPasswordBlur;
        }

        if (this.handlers.onSubmit !== onSubmit) {
            this.place.querySelector('.button-sign-up').addEventListener('click', (event) => {
                event.preventDefault();
                onSubmit();
            });
            this.handlers.onSubmit = onSubmit;
        }
    }

    render(state, handlers) {
        if (this.isInitialized === false) {
            this.init();
            this.isInitialized = true;
        }

        this.updateEventListeners(handlers.onLoginBlur, handlers.onPasswordBlur, handlers.onSubmit, handlers.onRepeatPasswordBlur);

        const $login = this.place.querySelector('#sign-up-mail');
        const $loginErrorMessage = this.place.querySelector('.login-error-message');

        $login.value = state.login.value;
        $loginErrorMessage.innerHTML = `${state.login.errorMessage}`;


        const $password = this.place.querySelector('#sign-up-password');
        const $passwordErrorMessage = this.place.querySelector('.password-error-message');

        $password.value = state.password.value;
        $passwordErrorMessage.innerHTML = `${state.password.errorMessage}`;

        const $repeatPassword = this.place.querySelector('#sign-up-password-repeat');
        const $repeatPasswordErrorMessage = this.place.querySelector('.repeat-password-error-message');

        $repeatPassword.value = state.repeatPassword.value;
        $repeatPasswordErrorMessage.innerHTML = `${state.repeatPassword.errorMessage}`;

    }
}