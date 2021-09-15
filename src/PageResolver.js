export class PageResolver {
  constructor (pageMapping, additionalContainer, mainContainer) {
    this.pageMapping = pageMapping;
    this.mainContainer = mainContainer;
    this.additionalContainer = additionalContainer;
    this.active = this.mainContainer;
    this.inactive = this.additionalContainer;
  }

  goTo (pageName, params) {
    const controller = this.pageMapping[pageName].controller;
    const htmlToRender = controller.connect(params);

    this.placeToContainer(htmlToRender);
    controller.updateListeners();

    this.toggleActive();
    this.switchActive();
  }

  placeToContainer (html) {
    this.inactive.innerHTML = html;
  }

  toggleActive () {
    [this.mainContainer, this.additionalContainer].forEach(container => container.classList.toggle('active'));
  }

  switchActive () {
    const inActive = this.inactive;

    this.inactive = this.active;
    this.active = inActive;
  }
}

