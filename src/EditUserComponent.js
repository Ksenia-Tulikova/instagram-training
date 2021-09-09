import { BaseComponent, TEMPLATES } from './BaseComponent';
import { pageResolver } from './app';

export class EditUserComponent extends BaseComponent {
  constructor ($tableInsertPlace, handlers) {
    super($tableInsertPlace, undefined, handlers);
    this.countries = pageResolver.pageMapping.editUser.countryOptions;
    this.htmlTemplate = TEMPLATES.editUser;
    this.htmlTemplateCountryOptions = TEMPLATES.option;

  }

  render(state) {
    let htmlToRender = this.htmlTemplate;

    const countryOptionsHtml = this.countries.map(country => {
      let optionSelected = (country === state.userCountry) ? 'selected' : '';
        return this._fillTemplateWithData(this.htmlTemplateCountryOptions, { country, optionSelected });
      }).join('');

    htmlToRender = htmlToRender.replaceAll(`{options}`, countryOptionsHtml);

    this.place.innerHTML = this._fillTemplateWithData(htmlToRender, state);
    super.updateEventListeners();
  }

  _fillTemplateWithData (template, data) {
    let html = template;
    const paths = new Set(html.match(/(?<={)(.+?)(?=})/g));

    paths.forEach((path) => {
      html = html.replaceAll(`{${path}}`, super.get(data, path));
    });

    return html;
  }
}