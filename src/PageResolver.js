export class PageResolver {
    constructor(pageMapping) {
        this.pageMapping = pageMapping;
        // this.place = place;
    }

    goTo(pageName) {
        this.pageMapping[pageName].controller.connect();
    }
}

