import { BaseComponent, TEMPLATES } from '../BaseComponent';
import { pageResolver } from '../../app';

export class EditUserComponent extends BaseComponent {
  constructor ($tableInsertPlace, handlers) {
    super($tableInsertPlace, undefined, handlers);
    this.countries = pageResolver.pageMapping.editUser.countryOptions;
    this.htmlTemplate = TEMPLATES.editUser;
    this.htmlTemplateCountryOptions = TEMPLATES.option;
    this.htmlTemplateUserPhoto = TEMPLATES.userPhoto;

  }

  render (state) {
    let htmlToRender = this.htmlTemplate;

    htmlToRender = htmlToRender.replaceAll(`{options}`, this._fillCountryOptions(state.userCountry));
    htmlToRender = htmlToRender.replaceAll(`{photos}`, this._fillUserPhotos(state.photos));

    return this._fillTemplateWithData(htmlToRender, state);
  }

  _fillCountryOptions (userCountry) {
    const countryOptionsHtml = this.countries.map(country => {
      let optionSelected = (country === userCountry) ? 'selected' : '';
      return this._fillTemplateWithData(this.htmlTemplateCountryOptions, { country, optionSelected });
    }).join('');

    return countryOptionsHtml;
  }

  _fillUserPhotos (userPhotos) {
    let userPhotosHtml = '';

    if (userPhotos) {
      userPhotosHtml = userPhotos.map(userPhoto => {
        return this._fillTemplateWithData(this.htmlTemplateUserPhoto, userPhoto);
      }).join('');
    }

    return userPhotosHtml;
  }

  _fillTemplateWithData (template, data) {
    let html = template;
    const paths = new Set(html.match(/(?<={)(.+?)(?=})/g));

    paths.forEach((path) => {
      html = html.replaceAll(`{${path}}`, super.get(data, path));
    });

    return html;
  }

  renderImage ({ queryParam, src }) {
    this.place.querySelector(queryParam).src = src;
  }

  renderImageCard(imageInfo){
    const userPhotosHtml = this._fillUserPhotos([imageInfo]);
    this.place.querySelector('.user-photos').insertAdjacentHTML('afterbegin',userPhotosHtml);
    super.updateEventListeners();
    // this.place.querySelector(`#${imgName}`).closest('.photo-container').remove();
  }

  deleteImageCard(image) {
    image.closest('.photo-container').remove();
  }

}