import { BaseComponent, TEMPLATES } from './BaseComponent';

export class SignUpComponent extends BaseComponent {
    constructor($formInsertPlace, handlers) {
        super($formInsertPlace,undefined, handlers);
        this.htmlTemplate = TEMPLATES.signUp;
    }

    updateErrorsView(state) {
        for (const errorField in state) {
            const $input = this.place.querySelector(`.${errorField}-error-message`);
            if($input) {
                $input.innerHTML = state[errorField].errorMessage;
            }
        }
    }
}

