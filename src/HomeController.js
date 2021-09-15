import {TEMPLATES} from "./BaseComponent";
import {HomeComponent} from "./HomeComponent";
import { BaseController } from './BaseController';

export class HomeController extends BaseController {
    constructor(place) {
        super(undefined)
        this.place = place;
    }

    connect() {
        this.view = new HomeComponent(this.place, TEMPLATES.home);
        return this.view.render();
    }
}