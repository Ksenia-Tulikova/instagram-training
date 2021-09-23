import { BaseComponent, TEMPLATES } from '../BaseComponent';

export class LoginComponent extends BaseComponent{
    constructor($formInsertPlace, handlers) {
        super($formInsertPlace, undefined, handlers);
        this.htmlTemplate = TEMPLATES.login;
    }

    updateValidCredentialsClass() {
        this.place.querySelector('.form').classList.add('validCredentials-false');
    }
}
