import { ImagesComponent } from './ImagesComponent';
import { getImages } from '../../api';
import { BaseController } from '../BaseController';

export class ImagesController extends BaseController {
  constructor (place) {
    super(undefined)
    this.place = place;
    this.state = '';
    this.avatarPath = 'http://localhost:8080/avatars/';
    this.imagePath = 'http://localhost:8080/userImages/';
  }

  async connect() {
    this.state = await getImages();

    this._createSrc();
    this._convertDateToRightFormat();

    this.view = new ImagesComponent(this.place);
    return this.view.render(this.state);
  }

  _createSrc() {
    if (this.state) {
      this.state.forEach(img => {
        img.avatar = `${this.avatarPath}${img.avatar ? img.avatar : 'default_avatar.jpg'}`;
        img.image = `${this.imagePath}${img.image}`;
      });
    }
  }

  _convertDateToRightFormat() {
    if (this.state) {
      this.state.forEach(img => {
        img.date = img.date.slice(0,10);
      });
    }
  }

}