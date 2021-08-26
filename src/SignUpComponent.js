import {BaseComponent} from "./BaseComponent";

export class SignUpComponent extends BaseComponent {
    constructor($formInsertPlace, htmlTemplate, handlers) {
        super($formInsertPlace, htmlTemplate, handlers);
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

