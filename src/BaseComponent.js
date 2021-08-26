export const TEMPLATES = {
    login: `<div class="login ">
            <form class="form validCredentials-{validCredentials}">
                <h2>
                    <span class="form-login-invitation ">Hello</span>
                    <span class="form-login-error">Login or password is invalid</span>
                </h2>
                <div class="form-field">
                    <label for="login-mail"><i class="fas fa-user"></i></label>
                    <input id="login-mail" type="text" name="login" placeholder="E-Mail" value="{login.value}">
                </div>
                <div class="form-field">
                    <label for="login-password"><i class="fas fa-lock"></i></label>
                    <input id="login-password" type="password" name="password" placeholder="Password" value="{password.value}">
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
        </div>`,
    signUp: `<div class="sign-up">
            <form class="form">
                <h2>Sign Up right now!</h2>
                <div class="form-field">
                    <label for="sign-up-mail"><i class="fas fa-user"></i></label>
                    <input id="sign-up-mail" type="text" name="login" placeholder="E-Mail" value="{login.value}">
                    <span class="error-message login-error-message">{login.errorMessage}</span>
                </div>
                <div class="form-field">
                    <label for="sign-up-password"><i class="fas fa-lock"></i></label>
                    <input id="sign-up-password" type="password" name="password" placeholder="Password" value="{password.value}">
                    <span class="error-message password-error-message" >{password.errorMessage}</span>
                </div>
                <div class="form-field">
                    <label for="sign-up-password-repeat"><i class="fas fa-lock"></i></label>
                    <input id="sign-up-password-repeat" type="password" name="repeat-password" placeholder="Repeat password" value="{repeatPassword.value}">
                    <span class="error-message repeat-password-error-message">{repeatPassword.errorMessage}</span>
                </div>
                <button type="submit" class="button button-sign-up">
                    <div class="arrow-wrapper">
                        <span class="arrow"></span>
                    </div>
                    <p class="button-text">SIGN UP</p>
                </button>
            </form>
        </div>`,
    home: `<div class="home active">
            <div class="finished ">
                <img
                    class="finished-icon"
                    src="https://i.pinimg.com/originals/58/29/20/58292072e708fc2b709a741b0bc14b84.gif"
                    alt="Tick Tick Verified Sticker - Tick Tick Verified Circle Stickers"
                >
            </div>
        </div>`,
}

export class BaseComponent {
    constructor($formInsertPlace, htmlTemplate, handlers) {
        this.place = $formInsertPlace;
        this.handlers = handlers;
        this.htmlTemplate = htmlTemplate;
    }

    updateEventListeners() {
        if (this.handlers) {
            for (const handler in this.handlers) {
                const handlerData = this.handlers[handler];
                this.place.querySelector(handlerData.queryParam).addEventListener(handlerData.eventType, (event) => {
                    handlerData.callback(event);
                });
            }
        }
    }

    renderTemplate(html) {
        this.place.innerHTML = html;
        this.updateEventListeners();
    }
}