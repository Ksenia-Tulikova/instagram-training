export class PageResolver {
    constructor(pageMapping) {
        this.pageMapping = pageMapping;
    }

    goTo(pageName, params) {
        this.pageMapping[pageName].controller.connect(params);
    }
}

