export class BaseController {
  constructor (place) {
    this.place = place;
    this.view = null;
  }

  updateListeners () {
    this.view.updateEventListeners();
  }
}