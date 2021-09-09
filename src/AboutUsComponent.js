import { BaseComponent, TEMPLATES } from './BaseComponent';

export class AboutUsComponent extends BaseComponent{
  constructor ($tableInsertPlace) {
    super($tableInsertPlace, undefined, undefined);
    this.htmlTemplate = TEMPLATES.aboutUs;
  }
}