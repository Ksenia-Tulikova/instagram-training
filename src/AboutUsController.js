import { AboutUsComponent } from './AboutUsComponent';

export class AboutUsController{
    constructor (place) {
      this.place = place;
      this.state = {
        greeting: 'AboutUs',
      };
  }

  connect() {
      this.view = new AboutUsComponent(this.place);
      this.view.render(this.state);
  }
}