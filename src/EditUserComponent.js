import { BaseComponent } from './BaseComponent';
import { pageResolver } from './app';


export class EditUserComponent extends BaseComponent {
  constructor ($tableInsertPlace, htmlTemplatesConfig, handlers) {
    super($tableInsertPlace, undefined, handlers);
    this.htmlTemplateConfig = htmlTemplatesConfig;

  }

  render(state) {
    let htmlToRender = this.htmlTemplateConfig.default;

    const countryOptionsHtml = pageResolver.pageMapping.editUser.countryOptions.map(country => {
      let optionSelected = (country === state.userCountry) ? 'selected' : '';
        return this._fillTemplateWithData(this.htmlTemplateConfig.additional, { country, optionSelected });
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