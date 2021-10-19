import { BaseComponent, TEMPLATES } from '../BaseComponent';

export default class UsersTableComponent extends BaseComponent {
  constructor ($tableInsertPlace, handlers) {
    super($tableInsertPlace, undefined, handlers);
    this.htmlTemplate = TEMPLATES.usersTable;
    this.htmlTemplateUserRow = TEMPLATES.usersTableRow;
  }

  render (state) {
    console.log(state);
    let htmlToRender = this.htmlTemplate;

    const usersHtml = state.users.map(user => (
      this._fillUserTemplateWithData(this.htmlTemplateUserRow, user)
    )).join('');

    htmlToRender = htmlToRender.replaceAll(`{users}`, usersHtml);

    return htmlToRender;

  }

  togglePopUp() {
    this.place.querySelector('.delete-profile').classList.toggle('active');
  }

  _fillUserTemplateWithData (template, user) {
    let html = template;
    const paths = new Set(html.match(/(?<={)(.+?)(?=})/g));

    paths.forEach((path) => {
      html = html.replaceAll(`{${path}}`, super.get(user, path));
    });

    return html;
  }
}