import {BaseComponent} from "./BaseComponent";

export class HomeComponent extends  BaseComponent {
    constructor($formInsertPlace, htmlTemplate) {
        super($formInsertPlace, htmlTemplate);
    }

    render() {
        super.renderTemplate(this.htmlTemplate);
    }

}