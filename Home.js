export class Home {
    constructor($formInsertPlace) {
        this.place = $formInsertPlace;
        this.init();
    }

    init() {
        const home = `<div class="home active">
            <div class="finished ">
                <img
                    class="finished-icon"
                    src="https://i.pinimg.com/originals/58/29/20/58292072e708fc2b709a741b0bc14b84.gif"
                    alt="Tick Tick Verified Sticker - Tick Tick Verified Circle Stickers"
                >
            </div>
        </div>
        `;

        this.place.insertAdjacentHTML('afterbegin', home);
    }

}