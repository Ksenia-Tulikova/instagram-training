import {BaseComponent} from "./BaseComponent";

export class LoginComponent extends BaseComponent{
    constructor($formInsertPlace, htmlTemplate, handlers) {
        super($formInsertPlace, htmlTemplate, handlers);
    }

    updateValidCredentialsClass() {
        this.place.querySelector('.form').classList.add('validCredentials-false');
    }
}
