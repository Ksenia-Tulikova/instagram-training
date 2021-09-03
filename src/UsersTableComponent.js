import { BaseComponent } from './BaseComponent';

export default class UsersTableComponent extends BaseComponent {
  constructor ($tableInsertPlace, htmlTemplatesConfig, handlers) {
    super($tableInsertPlace, undefined, handlers);
    this.htmlTemplateConfig = htmlTemplatesConfig;
  }

  render (state) {
    let htmlToRender = this.htmlTemplateConfig.default;

    const usersHtml = state.users.map(user => (
      this._fillUserTemplateWithData(this.htmlTemplateConfig.additional, user)
    )).join('');

    htmlToRender = htmlToRender.replaceAll(`{users}`, usersHtml);

    this.place.innerHTML = htmlToRender;

    super.updateEventListeners();

  }

  togglePopUp() {
    this.place.querySelector('.delete-profile').classList.toggle('active');
  }

  _fillUserTemplateWithData (template, user) {
    let htmlUserRow = template;
    const paths = new Set(htmlUserRow.match(/(?<={)(.+?)(?=})/g));

    paths.forEach((path) => {
      htmlUserRow = htmlUserRow.replaceAll(`{${path}}`, super.get(user, path));
    });

    return htmlUserRow;
  }
}