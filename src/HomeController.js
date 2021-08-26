import {TEMPLATES} from "./BaseComponent";
import {HomeComponent} from "./HomeComponent";

export class HomeController {
    constructor(place) {
        this.place = place;
    }

    connect() {
        this.view = new HomeComponent(this.place, TEMPLATES.home);
        this.view.render();
    }
}