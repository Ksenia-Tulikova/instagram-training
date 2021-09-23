import { AboutUsComponent } from './AboutUsComponent';
import { BaseController } from '../BaseController';

export class AboutUsController extends BaseController {
    constructor (place) {
      super(undefined)
      this.place = place;
      this.state = {
        greeting: 'AboutUs',
      };
  }

  connect() {
      this.view = new AboutUsComponent(this.place);
      return this.view.render(this.state);
  }

}