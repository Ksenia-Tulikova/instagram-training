import {BaseComponent} from "./BaseComponent";

export class SignUpComponent extends BaseComponent {
    constructor($formInsertPlace, htmlTemplate, handlers) {
        super($formInsertPlace, htmlTemplate, handlers);
    }

    get(state, path) {
        let pathSplited = path.split('.');

        let result = state;
        for (const fieldName of pathSplited) {
            result = result[fieldName];
        }

        return result;
    }

    render(state) {
        let htmlToRender = this.htmlTemplate;
        let paths = new Set(this.htmlTemplate.match(/(?<={)(.+?)(?=})/g));

        if (paths) {
            paths.forEach((path) => {
                htmlToRender = htmlToRender.replaceAll(`{${path}}`, this.get(state, path));
            })
        }

        super.renderTemplate(htmlToRender);

        // const $login = this.place.querySelector('#sign-up-mail');
        // const $loginErrorMessage = this.place.querySelector('.login-error-message');
        //
        // $login.value = state.login.value;
        // $loginErrorMessage.innerHTML = `${state.login.errorMessage}`;
        //
        //
        // const $password = this.place.querySelector('#sign-up-password');
        // const $passwordErrorMessage = this.place.querySelector('.password-error-message');
        //
        // $password.value = state.password.value;
        // $passwordErrorMessage.innerHTML = `${state.password.errorMessage}`;
        //
        // const $repeatPassword = this.place.querySelector('#sign-up-password-repeat');
        // const $repeatPasswordErrorMessage = this.place.querySelector('.repeat-password-error-message');
        //
        // $repeatPassword.value = state.repeatPassword.value;
        // $repeatPasswordErrorMessage.innerHTML = `${state.repeatPassword.errorMessage}`;

    }
}

