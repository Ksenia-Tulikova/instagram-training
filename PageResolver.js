export const PAGES = {
    'login': 'login',
    'signUp': 'signUp',
    'home': 'home'
}

export class PageResolver {
    constructor(place, pageMapping) {
        this.pageMapping = pageMapping;
        this.place = place;
    }

    goTo(pageName) {
        this.clearPage();
        const component = new this.pageMapping[pageName].view(this.place);

        if (this.pageMapping[pageName].controller) {
            this.pageMapping[pageName].controller.connect(component);
        }
    }

    clearPage() {
        this.place.innerHTML = '';
    }
}

