export class LoginComponent {
    constructor($formInsertPlace) {
        this.place = $formInsertPlace;
        this.isInitialized = false;
        this.handlers = {};
    }

    init() {
        const loginForm = `<div class="login">
            <form class="form">
                <h2>
                    <span class="form-login-invitation">Hello</span>
                    <span class="form-login-error">Login or password is invalid</span>
                </h2>
                <div class="form-field">
                    <label for="login-mail"><i class="fas fa-user"></i></label>
                    <input id="login-mail" type="text" name="login" placeholder="E-Mail">
                </div>
                <div class="form-field">
                    <label for="login-password"><i class="fas fa-lock"></i></label>
                    <input id="login-password" type="password" name="password" placeholder="Password">
                </div>
                <button type="submit" class="button button-sign-in">
                    <div class="arrow-wrapper">
                        <span class="arrow"></span>
                    </div>
                    <p class="button-text">SIGN IN</p>
                </button>
                <button type="submit"  class="button button-sign-up">
                    <div class="arrow-wrapper">
                        <span class="arrow"></span>
                    </div>
                    <p class="button-text">SIGN UP</p>
                </button>
            </form>
        </div>`;

        this.place.insertAdjacentHTML('afterbegin', loginForm);
    }

    updateEventListeners(onLoginBlur, onPasswordBlur, onSubmit, onSignUp) {
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

        if (this.handlers.onSubmit !== onSubmit) {
            this.place.querySelector('.button-sign-in').addEventListener('click', (event) => {
                event.preventDefault();
                onSubmit();
            });
            this.handlers.onSubmit = onSubmit;
        }

        if (this.handlers.onSignUp !== onSignUp) {
            this.place.querySelector('.button-sign-up').addEventListener('click', (event) => {
                event.preventDefault();
                onSignUp();
            });
            this.handlers.onSignUp = onSignUp;
        }
    }

    render(state, handlers) {
        if (this.isInitialized === false) {
            this.init();
            this.isInitialized = true;
        }

        this.updateEventListeners(handlers.onLoginBlur, handlers.onPasswordBlur, handlers.onSubmit, handlers.onSignUp);

        const $login = this.place.querySelector('#login-mail');
        const $password = this.place.querySelector('#login-password');

        $login.value = state.login.value;
        $password.value = state.password.value;

        if (state.validCredentials === false) {
            this.place.querySelector('.form').classList.add('error');
        }

    }

}