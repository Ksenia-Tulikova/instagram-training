export class ServiceHistory {
  constructor() {

  }
  update(path) {
    const location = window.location;
    const url = `${location.origin}${path}`;
    window.history.pushState({}, path, url);


  }

  stepBack(goToPrevPageHandler){
    window.onpopstate = goToPrevPageHandler;
  }
}