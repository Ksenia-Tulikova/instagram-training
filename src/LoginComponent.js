import {BaseComponent} from "./BaseComponent";

export class LoginComponent extends BaseComponent{
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

        // const $login = this.place.querySelector('#login-mail');
        // const $password = this.place.querySelector('#login-password');
        //
        // $login.value = state.login.value;
        // $password.value = state.password.value;
        //
        // if (state.validCredentials === false) {
        //     this.place.querySelector('.form').classList.add('error');
        // }

    }
}
